import { memo, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import groupsActions from '../../store/groups/actions';
import lessonPlanActions from '../../store/lesson-plan/actions'
import useInit from "../../hooks/use-init";
import logo from '../../img/logo.png';
import LessonPlanHead from "../../components/lesson-plan-head";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Weekday from "../../components/weekday";
import LessonPlanRow from "../../components/lesson-plan-row";

function LessonPlan() {

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(groupsActions.load());
    dispatch(lessonPlanActions.load());
  })

  const select = useSelector(state => ({
    groups: state.groups.list,
    lessonPlan: state.lessonPlan.list,
  }));

  const rows = useMemo(() => {
    const rows = [];
    for(let i = 1; i < 7; i++){
      rows.push(<LessonPlanRow groups={select.groups} list={select.lessonPlan.filter(
        function(item) {
          return item.weekday === i;
        }
      )}/>);
    }
    return rows;
  }, [select.lessonPlan])

  return (
    <PageLayout>
      <Header logo={logo} />
      <LessonPlanLayout>
        <LessonPlanHead groups={select.groups} />
        {rows}
      </LessonPlanLayout>
    </PageLayout>
  )
}

export default memo(LessonPlan);