import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import groupsActions from '../../store/groups/actions';
import lessonPlanActions from '../../store/lesson-plan/actions';
import modalsActions from '../../store/modals/actions';
import useInit from "../../hooks/use-init";
import logo from '../../img/logo.png';
import LessonPlanHead from "../../components/lesson-plan-head";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Spinner from '../../components/spinner';
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
    waiting: state.lessonPlan.waiting
  }));

  const callbacks = {
    openModalLesson: useCallback((item) => {
      dispatch(modalsActions.open('lesson', item));
    })
  }

  const rows = useMemo(() => {
    const rows = [];
    for (let i = 1; i < 7; i++) {
      rows.push(<LessonPlanRow key={i} groups={select.groups} onItemClick={(item) => callbacks.openModalLesson(item)} weekday={i} list={select.lessonPlan.filter(
        function (item) {
          return item.weekday === i;
        }
      )} />);
      rows.push(<hr style={{ top: '20px', bottom: '20px' }} />);
    }
    return rows;
  }, [select.lessonPlan, select.waiting])

  return (
    <PageLayout>
      <Header logo={logo} />
      <LessonPlanLayout>
        <Spinner active={select.waiting}>
          <LessonPlanHead groups={select.groups} />
          {rows}
        </Spinner>
      </LessonPlanLayout>
    </PageLayout>
  )
}

export default memo(LessonPlan);