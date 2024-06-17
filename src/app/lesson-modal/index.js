import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import subjectsActions from '../../store/subjects/actions';
import teacherSubjectsActions from '../../store/teacher-subject/actions';
import lessonGroupsActions from '../../store/lesson-group/actions';
//import groupTeachersActions from '../../store/group-teachers/actions';
import lessonPlanActions from '../../store/lesson-plan/actions'
import audiencesActions from '../../store/audiences/actions';
import Spinner from "../../components/spinner";
import { Radio, Flex, Button, Checkbox } from "antd";
import LessonSelect from "../../components/lesson-select";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import uniqueValues from "../../utils/unique-values";

function LessonModal({ lessonPlan, notChangeWeek }) {

  const [lesson, setLesson] = useState(lessonPlan);

  const [teachers, setTeachers] = useState(lessonPlan.teachers ? [(lessonPlan.teachers[0] ? lessonPlan.teachers[0] : null), (lessonPlan.teachers[1] ? lessonPlan.teachers[1] : null)] : [null, null]);

  const [isDistantce, setIsDistantce] = useState(lessonPlan.isDistantce ? lessonPlan.isDistantce : false);

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(teachersActions.load());
    dispatch(lessonGroupsActions.load(lessonPlan.group.id, null));
    dispatch(audiencesActions.load());
  })

  const select = useSelector(state => ({
    teachers: state.teachers.list,
    lessonGroups: state.lessonGroups.list,
    subjects: state.lessonGroups.list,
    audiences: state.audiences.list,
  }))

  const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];

  const putLesson = async (bool) => {
    if (bool) {
      await Promise.all([dispatch(lessonPlanActions.put({ ...lesson, teachers: teachers, isDistantce: isDistantce },
        [{ ...teachers[0], isMain: true },  (teachers[1] != null ? { ...teachers[1], isMain: false } : null)]))]);
      dispatch(modalsActions.close('lesson'));
      dispatch(lessonPlanActions.load());
    }
  }

  const postLesson = async (bool) => {
    await Promise.all([dispatch(lessonPlanActions.post({ ...lesson, teachers: teachers, isDistantce: isDistantce }))]);
    dispatch(lessonPlanActions.load());
    dispatch(modalsActions.close('lesson'));
  }

  const deleteLesson = async (bool) => {
    dispatch(lessonPlanActions.delete(lessonPlan.id));
    dispatch(modalsActions.close('lesson'));
  }

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('lesson'));
    }),
    onAccept: useCallback(async () => {

      if (!teachers[0]) {
        toast.error('Не выбран первый преподаватель');
        return;
      }
      if (!lesson.subject) {
        toast.error('Не выбран предмет');
        return;
      }

      if (teachers[1]) {
        if (teachers[0].id == teachers[1].id) {
          toast.error('Первый и второй преподаватель не могут быть одинаковыми');
          return;
        }
      }

      if (lesson.subject && teachers[0] != teachers[1] && teachers[0]) {
        if (lesson.id && lessonPlan.weekNumber == lesson.weekNumber) {
          dispatch(modalsActions.open('confirm', {
            title: 'Внимание',
            text: 'Вы действительно хотите обновить пару?',
            onOk: putLesson
          }))
        }
        else {

          dispatch(modalsActions.open('confirm', {
            title: 'Внимание',
            text: 'Вы действительно хотите добавить новую пару пару?',
            onOk: postLesson
          }))
        }
      }
    }),
    onDelete: useCallback(() => {
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы действительно удалить пару?',
        onOk: deleteLesson
      }))
    })
  }

  const availableSubjects = useMemo(() => {
    if (select.lessonGroups) {
      return uniqueValues(select.lessonGroups, 'subject').map(s => {
        return {
          value: s.id,
          label: s.name
        }
      })
    }
    return null;
  }, [dispatch, select.lessonGroups]);

  const availableTeachers = useMemo(() => {
    if (select.lessonGroups) {
      return uniqueValues(uniqueValues(select.lessonGroups, 'lessonGroupTeachers')
        .flatMap(arr => arr.filter(item => item.teacher).map(item => item.teacher))).map(t => {
          console.log(t);
          return {
            value: t.id,
            label: `${t.lastName} ${t.firstName[0]}. ${t.middleName[0]}.`
          }
        });
    }
    return null;
  }, [dispatch, select.lessonGroups])

  console.log({ ...lesson, teachers: teachers, isDistantce: isDistantce });

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <ModalLayout labelClose={'Х'} onClose={callbacks.closeModal}
        title={`${lessonPlan.group.groupCode}, ${weekdays[lessonPlan.weekday - 1]}, ${lessonPlan.lessonNumber}-я пара`}>
        <Spinner active={select.waiting}>
          <LessonSelect placeholder='Предмет'
            defaultValue={lessonPlan.subject && lessonPlan.subject.id}
            onChange={(value) => setLesson({
              ...lesson, subject: select.subjects.find((subject) => {
                return subject.id === value
              })
            })}
            // selectOptions={uniqueValues(select.lessonGroups, 'subject').map((subject) => {
            //   return {
            //     value: subject.id,
            //     label: subject.name
            //   }
            // })}
            selectOptions={availableSubjects}
          />
          <LessonSelect placeholder='Первый преподаватель'
            defaultValue={lessonPlan.teachers && lessonPlan.teachers[0] && lessonPlan.teachers[0].id}
            onChange={(value) => setTeachers([select.teachers.find((teacher) => {
              return teacher.id === value
            }), teachers[1]])}
            // selectOptions={uniqueValues(select.lessonGroups, 'lessonGroupTeachers.teacher').map((teacher) => {
            //   return {
            //     value: teacher.id,
            //     label: `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`
            //   }
            // })}
            selectOptions={availableTeachers}
          />
          <LessonSelect placeholder='Второй преподаватель'
            defaultValue={lessonPlan.teachers && lessonPlan.teachers[1] && lessonPlan.teachers[1].id}
            onChange={(value) => setTeachers([teachers[0], select.teachers.find((teacher) => {
              return teacher.id === value
            })])}
            selectOptions={[{ value: null, label: 'Нет' }, ...select.teachers.map((teacher) => {
              return {
                value: teacher.id,
                label: `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`
              }
            })]} />
          <LessonSelect placeholder='Кабинет'
            defaultValue={lessonPlan.audience && lessonPlan.audience.id}
            onChange={(value) => setLesson({
              ...lesson, audience: select.audiences.find((audience) => {
                return audience.id === value
              })
            })}
            selectOptions={[{ value: null, label: 'Нет' }, ...select.audiences.map((audience) => {
              return {
                value: audience.id,
                label: audience.number
              }
            })]} />
          <Checkbox defaultChecked={isDistantce}
            style={{ margin: 'auto' }} size='large'
            onChange={(e) => setIsDistantce(e.target.checked)}>Дистанционно</Checkbox>
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
    </>
  )
}

export default memo(LessonModal);