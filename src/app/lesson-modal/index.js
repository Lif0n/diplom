import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import subjectsActions from '../../store/subjects/actions';
import groupTeachersActions from '../../store/group-teachers/actions';
import lessonPlanActions from '../../store/lesson-plan/actions'
import audiencesActions from '../../store/audiences/actions';
import Spinner from "../../components/spinner";
import { Radio, Flex, Button } from "antd";
import LessonSelect from "../../components/lesson-select";

function LessonModal({ lessonPlan, notChangeWeek }) {

  const [lesson, setLesson] = useState(lessonPlan);

  const [teachers, setTeachers] = useState(lessonPlan.teachers ? [(lessonPlan.teachers[0] ? lessonPlan.teachers[0] : null), (lessonPlan.teachers[1] ? lessonPlan.teachers[1] : null)] : [null, null]);

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(teachersActions.load());
    dispatch(subjectsActions.load());
    dispatch(groupTeachersActions.load(lessonPlan.group.id));
    dispatch(audiencesActions.load());
  })

  const select = useSelector(state => ({
    teachers: state.teachers.list,
    groupTeachers: state.groupTeachers.list,
    subjects: state.subjects.list,
    audiences: state.audiences.list,
    waiting: state.subjects.waiting && state.groupTeachers.waiting && state.teachers.waiting && state.audiences.waiting,
  }))

  const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('lesson'));
    }),
    onAccept: useCallback(async () => {
      console.log(teachers, lesson.subject);

      if (!teachers[0]) {
        console.log('2');
        alert('Не выбран основной преподаватель');
        return;
      }
      if (!lesson.subject) {
        console.log('3');
        alert('Не выбран предмет');
        return;
      }

      if (teachers[0] == teachers[1]) {
        console.log('1');
        alert('Основной и запасной преподаватель не могут быть одинаковыми');
        return;   
      }

      if(lesson.subject && teachers[0] != teachers[1] && teachers[0]){
        console.log(lesson.subject, teachers);
        if (lesson.id && lessonPlan.weekNumber == lesson.weekNumber && confirm('Вы действительно хотите обновить пару?') ) {
          await Promise.all([dispatch(lessonPlanActions.put({ ...lesson, teachers: teachers, isDistance: false }))]);
          dispatch(lessonPlanActions.load());
          dispatch(modalsActions.close('lesson'));
          
        }
        else if(confirm('Вы действительно хотите добавить новую пару?') ){
          await Promise.all([dispatch(lessonPlanActions.post({ ...lesson, teachers: teachers, isDistance: false }))]);
          dispatch(lessonPlanActions.load());
          dispatch(modalsActions.close('lesson'));
        }
      }
    }),
    onDelete: useCallback(() => {
      if(confirm('Вы действительно хотите удалить пару?')){
      dispatch(lessonPlanActions.delete(lessonPlan.id));
      dispatch(modalsActions.close('lesson'));}
    })
  }

  return (
    <ModalLayout labelClose={'Х'} onClose={callbacks.closeModal}
      title={`${lessonPlan.group.speciality.shortname}-${lessonPlan.group?.name}, ${weekdays[lessonPlan.weekday - 1]}, ${lessonPlan.lessonNumber}-я пара`}>
      <Spinner active={select.waiting}>
        <LessonSelect placeholder='Предмет'
          defaultValue={lessonPlan.subject && lessonPlan.subject.id}
          onChange={(value) => setLesson({
            ...lesson, subject: select.subjects.find((subject) => {
              return subject.id === value
            })
          })}
          selectOptions={select.subjects.map((subject) => {
            return {
              value: subject.id,
              label: subject.name
            }
          })} />
        <LessonSelect placeholder='Основной преподаватель'
          defaultValue={lessonPlan.teachers && lessonPlan.teachers[0] && lessonPlan.teachers[0].id}
          onChange={(value) => setTeachers([select.teachers.find((teacher) => {
            return teacher.id === value
          }), teachers[1]])}
          selectOptions={select.teachers.map((teacher) => {
            return {
              value: teacher.id,
              label: `${teacher.surname} ${teacher.name}. ${teacher.patronymic}`
            }
          })} />
        <LessonSelect placeholder='Запасной преподаватель'
          defaultValue={lessonPlan.teachers && lessonPlan.teachers[1] && lessonPlan.teachers[1].id}
          onChange={(value) => setTeachers([teachers[0], select.teachers.find((teacher) => {
            return teacher.id === value
          })])}
          selectOptions={select.teachers.map((teacher) => {
            return {
              value: teacher.id,
              label: `${teacher.surname} ${teacher.name}. ${teacher.patronymic}`
            }
          })} />
        <LessonSelect placeholder='Кабинет'
          defaultValue={lessonPlan.audience && lessonPlan.audience.id}
          onChange={(value) => setLesson({
            ...lesson, audience: select.audiences.find((audience) => {
              return audience.id === value
            })
          })}
          selectOptions={select.audiences.map((audience) => {
            return {
              value: audience.id,
              label: audience.number
            }
          })} />
        {!notChangeWeek && <Flex vertical gap='middle' style={{ margin: '15px 0px', alignItems: 'center' }}>
          <Radio.Group defaultValue={lessonPlan.weekNumber ? lessonPlan.weekNumber : 0}
            buttonStyle="solid" size="large"
            onChange={(value) => setLesson({ ...lesson, weekNumber: value.target.value })}
            options={[{ label: 'Первая неделя', value: 0 }, { label: 'Вторая неделя', value: 1 }]}
            optionType="button" />
        </Flex>}
        <Flex gap='middle' style={{ margin: '15px 0px', justifySelf: 'center' }}>
          <Button type="primary" size="large" onClick={callbacks.onAccept}>{(lessonPlan.id && lesson.weekNumber == lessonPlan.weekNumber) ? 'Изменить пару' : 'Добавить пару'}</Button>
          {(lessonPlan.id && lesson.weekNumber == lessonPlan.weekNumber) && <Button type="primary" size="large" danger onClick={callbacks.onDelete}>Удалить пару</Button>}
        </Flex>
      </Spinner>
    </ModalLayout>
  )
}

export default memo(LessonModal);