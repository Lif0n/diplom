import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LessonPlanHead from "../../components/lesson-plan-head";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Spinner from '../../components/spinner';
import LessonPlanRow from "../../components/lesson-plan-row";
import modalsActions from '../../store/modals/actions';
import uniqueValues from '../../utils/unique-values';


function LessonPlanTable() {
  

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    lessonPlan: state.lessonPlan.list,
    waiting: state.lessonPlan.waiting
  }));

  const callbacks = {
    openModalLesson: useCallback((item, notChangeWeek) => {
      dispatch(modalsActions.open('lesson', { item, notChangeWeek }));
    })
  }

  const groups = useMemo(() => {
    return uniqueValues(select.lessonPlan, 'group');
  }, [select.lessonPlan])

  const rows = useMemo(() => {
    const rows = [];
    uniqueValues(select.lessonPlan, 'weekday')
      .sort((a, b) => {
        return a - b;
      })
      .forEach((i) => {
        rows.push(<LessonPlanRow key={`lpr-${i}`} groups={groups} onItemClick={callbacks.openModalLesson} weekday={i} list={select.lessonPlan.filter(
          function (item) {
            return item.weekday === i;
          }
        )} />);
        rows.push(<hr key={`hr-${i}`} style={{ top: '20px', bottom: '20px' }} />);
      })
    return rows;
  }, [select.lessonPlan, dispatch])

  return (
    <LessonPlanLayout>
      <Spinner active={select.waiting}>
        <LessonPlanHead groups={groups} />
        {rows}
      </Spinner>
    </LessonPlanLayout>
  )

}

export default memo(LessonPlanTable);