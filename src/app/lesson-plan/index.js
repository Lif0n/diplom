import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import lessonPlanActions from '../../store/lesson-plan/actions';
import modalsActions from '../../store/modals/actions';
import useInit from "../../hooks/use-init";
import logo from '../../img/logo.png';
import LessonPlanHead from "../../components/lesson-plan-head";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Spinner from '../../components/spinner';
import LessonPlanRow from "../../components/lesson-plan-row";
import uniqueValues from '../../utils/unique-values'

function LessonPlan() {

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(lessonPlanActions.load());
  })

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

  console.log(groups);

  const rows = useMemo(() => {
    const rows = [];
    [1, 2, 3, 4, 5, 6].forEach((i) => {
      rows.push(<LessonPlanRow key={`lpr-${i}`} groups={groups} onItemClick={callbacks.openModalLesson} weekday={i} list={select.lessonPlan.filter(
        function (item) {
          return item.weekday === i;
        }
      )} />);
      rows.push(<hr key={`hr-${i}`} style={{ top: '20px', bottom: '20px' }} />);
    })
    return rows;
  }, [select.lessonPlan, select.waiting])

  return (
    <PageLayout>
      <Header logo={logo} selected='' />
      <LessonPlanLayout>
        <Spinner active={select.waiting}>
          <LessonPlanHead groups={groups} />
          {rows}
        </Spinner>
      </LessonPlanLayout>
    </PageLayout>
  )
}

export default memo(LessonPlan);