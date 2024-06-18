import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'
import useInit from "../../hooks/use-init";
import lessonGroupsActions from '../../store/lesson-group/actions';
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
    dispatch(lessonGroupsActions.load());
    dispatch(audiencesActions.load());
  })

  const select = useSelector(state => ({
    schedule: state.schedules.selected,
    lessonGroups: state.lessonGroups.list,
    audiences: state.audiences.list,
    lessonGroupsWaiting: state.lessonGroups.waiting,
    audiencesWaiting: state.audiences.waiting,
  }))

  const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];

  const putLesson = async (bool) => {
    if (bool) {
      dispatch(modalsActions.close('lesson'));
      await Promise.all([dispatch(lessonPlanActions.put({ ...lesson, teachers: teachers, isDistantce: isDistantce },
        [{ ...teachers[0], isMain: true }, (teachers[1] != null ? { ...teachers[1], isMain: false } : null)]))]);
      dispatch(lessonPlanActions.load());
    }
  }

  const postLesson = async (bool) => {
    dispatch(modalsActions.close('lesson'));
    await Promise.all([dispatch(lessonPlanActions.post({ ...lesson, teachers: teachers, isDistantce: isDistantce },
      [{ ...teachers[0], isMain: true }, (teachers[1] != null ? { ...teachers[1], isMain: false } : null)], select.schedule.id))]);
    dispatch(lessonPlanActions.load());

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

  const allSubjects = useMemo(() => {
    if (select.lessonGroups) {
      return uniqueValues(select.lessonGroups.filter((lg) => lg.group.id == lessonPlan.group.id), 'subject')
      // .map(s => {
      //   return {
      //     value: s.id,
      //     label: s.name
      //   }
      // })
    }
    return null;
  }, [dispatch, select.lessonGroups]);

  const allTeachers = useMemo(() => {
    if (select.lessonGroups) {
      if (lessonPlan.subject != null) {
        const newTeachers = []
        select.lessonGroups.filter((lg) => lg.subject.id == lessonPlan.subject.id).forEach(lg => {
          lg.lessonGroupTeachers.forEach(lt => {
            if (lt != null) {
              const { teacher } = lt;
              newTeachers.push(teacher);
            }
          })
        })
        const unique = {};

        newTeachers.forEach(t => {
          unique[t.id] = t;
        })

        const uniqueArray = Object.values(unique);
        return uniqueArray
        // .map(t => {
        //   return {
        //     value: t.id,
        //     label: `${t.lastName} ${t.firstName[0]}. ${t.middleName[0]}.`
        //   }
        // })
      }

      return uniqueValues(uniqueValues(select.lessonGroups.filter((lg) => lg.group.id == lessonPlan.group.id), 'lessonGroupTeachers')
        .flatMap(arr => arr.filter(item => item.teacher).map(item => item.teacher)))
      // .map(t => {
      //   return {
      //     value: t.id,
      //     label: `${t.lastName} ${t.firstName[0]}. ${t.middleName[0]}.`
      //   }
      // });
    }
    return null;
  }, [select.lessonGroups])


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
              ...lesson, subject: allSubjects.find((subject) => {
                return subject.id === value
              })
            })}
            selectOptions={allSubjects.map(s => {
              return {
                value: s.id,
                label: s.name
              }
            })}
            loading={select.lessonGroupsWaiting} />

          <LessonSelect placeholder='Первый преподаватель'
            defaultValue={lessonPlan.teachers && lessonPlan.teachers[0] && lessonPlan.teachers[0].id}
            onChange={(value) => setTeachers([allTeachers.find((teacher) => {
              return teacher.id === value
            }), teachers[1]])}
            selectOptions={[{ value: null, label: 'Нет' }, ...allTeachers.map(t => {
              return {
                value: t.id,
                label: `${t.lastName} ${t.firstName[0]}. ${t.middleName[0]}.`
              }
            })]}
            loading={select.teacherSubjectsWaiting && select.lessonGroupsWaiting} />

          <LessonSelect placeholder='Второй преподаватель'
            defaultValue={lessonPlan.teachers && lessonPlan.teachers[1] && lessonPlan.teachers[1].id}
            onChange={(value) => setTeachers([teachers[0], allTeachers.find((teacher) => {
              return teacher.id === value
            })])}
            selectOptions={[{ value: null, label: 'Нет' }, ...allTeachers.map(t => {
              return {
                value: t.id,
                label: `${t.lastName} ${t.firstName[0]}. ${t.middleName[0]}.`
              }
            })]}
            loading={select.teacherSubjectsWaiting && select.lessonGroupsWaiting} />

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
            })]} loading={select.audiencesWaiting} />

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