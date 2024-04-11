import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import subjectsActions from '../../store/subjects/actions';
import groupTeachersActions from '../../store/group-teachers/actions';
import audiencesActions from '../../store/audiences/actions';
import Spinner from "../../components/spinner";
import { Select, Radio, Flex, Button } from "antd";

function Lesson({ lessonPlan }) {

  const [lesson, setLesson] = useState(lessonPlan);

  const [teachers, setTeachers] = useState(lessonPlan.teachers ? [(lessonPlan.teachers[0] ? lessonPlan.teachers[0].id : 0), (lessonPlan.teachers[1] ? lessonPlan.teachers[1].id : 0)] : [0,0]);

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
    onAccept: useCallback(() => {
      console.log({...lesson, teachers: teachers});
    }),
    onDelete: useCallback(() => {
      
    })
  }

  return (
    <ModalLayout labelClose={'Х'} onClose={callbacks.closeModal}
      title={`${lessonPlan.group.speciality.shortname}-${lessonPlan.group?.name}, ${weekdays[lessonPlan.weekday - 1]}, ${lessonPlan.lessonNumber}-я пара`}>
      <Spinner active={select.waiting}>
        <Select style={{ zIndex: 10, width: '50%', transform: 'translate(-50%)', left: '50%', margin: '15px 0px' }} size="large"
          defaultValue={lessonPlan.subject && lessonPlan.subject.id}
          showSearch
          onChange={(value) => setLesson({...lesson, subject: {id: value}})}
          placeholder='Предмет'
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          options={select.subjects.map((subject) => {
            return {
              value: subject.id,
              label: subject.name
            }
          })} />
        <Select style={{ zIndex: 10, width: '50%', transform: 'translate(-50%)', left: '50%', margin: '15px 0px' }} size="large"
          defaultValue={lessonPlan.teachers && lessonPlan.teachers[0] && lessonPlan.teachers[0].id}
          showSearch
          placeholder='Основной преподаватель'
          onChange={(value) =>setTeachers(value, teachers[1])}
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          options={select.teachers.map((teacher) => {
            return {
              value: teacher.id,
              label: `${teacher.surname} ${teacher.name}. ${teacher.patronymic}`
            }
          })} />
        <Select style={{ zIndex: 10, width: '50%', transform: 'translate(-50%)', left: '50%', margin: '15px 0px' }} size="large"
          defaultValue={lessonPlan.teachers && lessonPlan.teachers[1] && lessonPlan.teachers[1].id}
          showSearch
          placeholder='Запасной преподаватель'
          onChange={(value) =>setTeachers(teacher[0], value)}
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          options={select.teachers.map((teacher) => {
            return {
              value: teacher.id,
              label: `${teacher.surname} ${teacher.name}. ${teacher.patronymic}`
            }
          })} />
        <Select style={{ zIndex: 10, width: '50%', transform: 'translate(-50%)', left: '50%', margin: '15px 0px' }} size="large"
          defaultValue={lessonPlan.audience && lessonPlan.audience.id}
          showSearch
          onChange={(value) =>setLesson({...lesson, audience: {id: value}})}
          placeholder='Кабинет'
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          options={select.audiences.map((audience) => {
            return {
              value: audience.id,
              label: audience.number
            }
          })} />
        <Flex vertical gap='middle' style={{margin: '15px 0px', position: "relative" , width: '50%', transform: 'translate(-50%)', left: '50%'}}>
          <Radio.Group defaultValue={lessonPlan.weekNumber ? lessonPlan.weekNumber : 0}
            buttonStyle="solid" size="large"
            onChange={(value) =>setLesson({...lesson, weekNumber: value})}>
            <Radio.Button value={0}>Первая неделя</Radio.Button>
            <Radio.Button value={1}>Вторая неделя</Radio.Button>
          </Radio.Group>
        </Flex>
        <Flex gap='middle' style={{margin: '15px 0px', position: "relative" , width: '50%', transform: 'translate(-50%)', left: '50%'}}>
          <Button type="primary" size="large" onClick={callbacks.onAccept}>{lessonPlan.id ? 'Изменить пару' : 'Добавить пару'}</Button>
          {lessonPlan.id && <Button type="primary" size="large" danger>Удалить пару</Button>}
        </Flex>
      </Spinner>
    </ModalLayout>
  )
}

export default memo(Lesson);