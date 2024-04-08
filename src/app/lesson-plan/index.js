import { memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import groupsActions from '../../store/groups/actions'
import useInit from "../../hooks/use-init";
import logo from '../../img/logo.png';
import LessonPlanHead from "../../components/lesson-plan-head";
import LessonPlanLayout from "../../components/lesson-plan-layout";

function LessonPlan() {

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(groupsActions.load());
  })

  const select = useSelector(state => ({
    groups: state.groups.list,
  }));

  console.log(select.groups);

  return (
    <PageLayout>
      <Header logo={logo} />
      <LessonPlanLayout>
        <LessonPlanHead groups={select.groups} />
      </LessonPlanLayout>
    </PageLayout>
  )
}

export default memo(LessonPlan);