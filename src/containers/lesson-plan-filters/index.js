import { Button, Flex } from "antd";
import { memo, useCallback, useMemo, useState, useEffect } from "react";
import LessonSelect from "../../components/lesson-select";
import modalsActions from '../../store/modals/actions';
import schedulesActions from '../../store/schedule/actions'
import lessonPlanActions from '../../store/lesson-plan/actions'
import { useDispatch, useSelector } from "react-redux";
import GetClosestSchedule from "../../utils/get-closest-schedule";
import GroupSchedules from "../../utils/group-schedules-by-dates";

function LessonPlanFilters() {

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    groups: state.groups.list,
    teachers: state.teachers.list,
    audiences: state.audiences.list,
    schedules: state.schedules.list,
    teachersWaitnig: state.teachers.waiting,
    groupsWaiting: state.groups.waiting,
    audiencesWaiting: state.audiences.waiting,
    schedulesWaiting: state.schedules.waiting
  }))

  const initialSchedule= useMemo(() => {
    if (select.schedules.length > 0) {
      const closest = GetClosestSchedule(select.schedules);
      console.log(closest);
      dispatch(schedulesActions.set(closest.id))
      return closest.id;
    }
    return null;
  }, [select.schedules]);

  const [params, setParams] = useState({ audience: null, group: null, teacher: null, schedule: null, department: 1 });


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
        dispatch(schedulesActions.set(schedule));
        return newParams;
      });
    }, [dispatch, params]),
    onDepartment: useCallback(department => {
      setParams(prevParams => {
        const newParams = { ...prevParams, department };
        dispatch(lessonPlanActions.setParams(newParams));
        return newParams;
      });
    }, [dispatch, params]),
    onReset: useCallback(() => {
      const resetParams = { audience: null, group: null, teacher: null };
      setParams(resetParams);
      dispatch(lessonPlanActions.setParams(resetParams));
    }, [dispatch]),
    onLoadSchedule: useCallback(() => {
      dispatch(modalsActions.open('schedule'))
    }),
    onPublish: useCallback(() => {      
      dispatch(schedulesActions.publish(params.schedule));
    }, [dispatch, params]),
  };

  useEffect(() => {
    setParams(prevParams => ({
      ...prevParams,
      schedule: initialSchedule
    }));
  }, [initialSchedule]);


  return (
    <Flex style={{ position: 'fixed', width: '100vw', top: '76px' }} gap={'large'} justify="center">
      <Button size="large" onClick={callbacks.onLoadSchedule} style={{ margin: '15px 0px' }}>Добавит расписание</Button>
      <LessonSelect
        showSearch
        placeholder={'Расписание'}
        defaultValue={initialSchedule}
        value={params.schedule}
        selectOptions={GroupSchedules(select.schedules)}
        onChange={callbacks.onSchedule}
      />
      <LessonSelect
        showSearch
        placeholder={'Отделение'}
        value={params.department}
        selectOptions={[{ value: 1, label: '1-е отделение' }, { value: 2, label: '2-е отделение' }]}
        defaultValue={1}
        onChange={callbacks.onDepartment}
      />
      <LessonSelect
        showSearch
        placeholder={'Группа'}
        mode="multiple"
        allowClear
        defaultValue={params.group}
        selectOptions={[ ...select.groups.map((group) => {
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
        mode="multiple"
        allowClear
        defaultValue={params.teacher}
        selectOptions={[...select.teachers.map((teacher) => {
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
        mode="multiple"
        allowClear
        defaultValue={params.audience}
        selectOptions={[ ...select.audiences.map((audience) => {
          return {
            value: audience.id,
            label: audience.number
          }
        })]}
        loading={select.audiencesWaiting}
        onChange={callbacks.onAudience}
        value={params.audience} />
      <Button type="secondary" size="large" style={{ margin: '15px 0px' }} onClick={callbacks.onReset}>Сбросить фильтры</Button>
      <Button type="primary" size="large" style={{ margin: '15px 0px' }} onClick={callbacks.onPublish}>Опубликовать</Button>
    </Flex>
  );
}

export default memo(LessonPlanFilters);