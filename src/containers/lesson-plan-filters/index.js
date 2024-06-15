import { Button, Flex } from "antd";
import { memo, useCallback, useMemo, useState } from "react";
import LessonSelect from "../../components/lesson-select";
import lessonPlanActions from '../../store/lesson-plan/actions'
import { useDispatch, useSelector } from "react-redux";

function LessonPlanFilters() {

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    params: state.lessonPlan.params,
    groups: state.groups.list,
    teachers: state.teachers.list,
    audiences: state.audiences.list,
    schedules: state.schedules.list,
    teachersWaitnig: state.teachers.waiting,
    groupsWaiting: state.groups.waiting,
    audiencesWaiting: state.audiences.waiting,
    schedulesWaiting: state.schedules.waiting
  }))

  const [params, setParams] = useState({ audience: null, group: null, teacher: null, schedule: null, department: null });


  const callbacks = {
    onTeacher: useCallback(teacher => {
      setParams(prevParams => {
        const newParams = { ...prevParams, teacher };
        dispatch(lessonPlanActions.setParams(newParams));
        return newParams;
      });
    }, [dispatch]),
    onAudience: useCallback(audience => {
      setParams(prevParams => {
        const newParams = { ...prevParams, audience };
        dispatch(lessonPlanActions.setParams(newParams));
        return newParams;
      });
    }, [dispatch]),
    onGroup: useCallback(group => {
      setParams(prevParams => {
        const newParams = { ...prevParams, group };
        dispatch(lessonPlanActions.setParams(newParams));
        return newParams;
      });
    }, [dispatch]),
    onSchedule: useCallback(schedule => {
      setParams(prevParams => {
        const newParams = { ...prevParams, schedule };
        dispatch(lessonPlanActions.setParams(newParams));
        return newParams;
      });
    }, [dispatch]),
    onReset: useCallback(() => {
      const resetParams = { audience: null, group: null, teacher: null };
      setParams(resetParams);
      dispatch(lessonPlanActions.setParams(resetParams));
    }, [dispatch])
  };

  return (
    <Flex style={{ position: 'fixed', width: '100vw', top: '76px' }} gap={'large'} justify="center">
      <LessonSelect
        showSearch
        placeholder={'Расписание'}
        selectOptions={select.schedules.map((schedule) => {
          return {
            value: schedule.id,
            label: `${schedule.academicYear} год, ${schedule.semester} семестр`
          }
        })}
      />
      <LessonSelect
        showSearch
        placeholder={'Отделение'}
        selectOptions={[{ value: 1, label: '1-е отделение' }, { value: 2, label: '2-е отделение' }]}
        defaultValue={1}
      />
      <LessonSelect
        showSearch
        placeholder={'Группа'}
        defaultValue={params.group}
        selectOptions={[{ value: null, label: 'Все группы' }, ...select.groups.map((group) => {
          return {
            value: group.id,
            label: `${group.groupCode}`
          }
        })]}
        onChange={callbacks.onGroup}
        loading={select.groupsWaiting}
        value={params.group} />
      <LessonSelect
        showSearch
        placeholder={'Преподаватель'}
        defaultValue={params.teacher}
        selectOptions={[{ value: null, label: 'Все преподаватели' }, ...select.teachers.map((teacher) => {
          return {
            value: teacher.id,
            label: `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`
          }
        })]}
        onChange={callbacks.onTeacher}
        loading={select.teachersWaitnig}
        value={params.teacher} />
      <LessonSelect
        showSearch
        placeholder={'Кабинет'}
        defaultValue={params.audience}
        selectOptions={[{ value: null, label: 'Все кабинеты' }, ...select.audiences.map((audience) => {
          return {
            value: audience.id,
            label: audience.number
          }
        })]}
        loading={select.audiencesWaiting}
        onChange={callbacks.onAudience}
        value={params.audience} />
      <Button type="primary" style={{ margin: '15px 0px' }} onClick={callbacks.onReset}>Сбросить фильтры</Button>
    </Flex>
  );
}

export default memo(LessonPlanFilters);