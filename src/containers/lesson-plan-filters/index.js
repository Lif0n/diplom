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
    teachersWaitnig: state.teachers.waiting,
    groupsWaiting: state.groups.waiting,
    audiencesWaiting: state.audiences.waiting
  }))

  const [params, setParams] = useState({ audience: null, group: null, teacher: null });


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
        placeholder={'Группа'}
        defaultValue={params.group}
        selectOptions={select.groups.map((group) => {
          return {
            value: group.id,
            label: `${group.speciality.shortname}-${group.name}`
          }
        })}
        onChange={callbacks.onGroup}
        loading={select.groupsWaiting}
        value={params.group} />
      <LessonSelect
        showSearch
        placeholder={'Преподаватель'}
        defaultValue={params.teacher}
        selectOptions={select.teachers.map((teacher) => {
          return {
            value: teacher.id,
            label: `${teacher.surname} ${teacher.name}.${teacher.patronymic}`
          }
        })}
        onChange={callbacks.onTeacher}
        loading={select.teachersWaitnig}
        value={params.teacher} />
      <LessonSelect
        showSearch
        placeholder={'Кабинет'}
        defaultValue={params.audience}
        selectOptions={select.audiences.map((audience) => {
          return {
            value: audience.id,
            label: audience.number
          }
        })}
        loading={select.audiencesWaiting}
        onChange={callbacks.onAudience}
        value={params.audience} />
      <Button type="primary" style={{ margin: '15px 0px' }} onClick={callbacks.onReset}>Сбросить фильтры</Button>
    </Flex>
  );
}

export default memo(LessonPlanFilters);