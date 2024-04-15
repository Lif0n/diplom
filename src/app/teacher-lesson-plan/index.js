import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import teachersActions from '../../store/teachers/actions';
import lessonPlanActions from '../../store/lesson-plan/actions';
import modalsActions from '../../store/modals/actions';
import useInit from "../../hooks/use-init";
import logo from '../../img/logo.png';
import LessonPlanHead from "../../components/lesson-plan-head";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Spinner from '../../components/spinner';
import LessonPlanRow from "../../components/lesson-plan-row";

function TeacherLessonPlan() {
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(teachersActions.load());
    dispatch(lessonPlanActions.load());
  })

  const select = useSelector(state => ({
    teachers: state.teachers.list,
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
    [1,2,3,4,5,6].forEach((i) => {
      rows.push(<LessonPlanRow key={`lpr-${i}`} groups={select.teachers} onItemClick={(item) => callbacks.openModalLesson(item)} weekday={i} list={select.lessonPlan.filter(
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
      <Header logo={logo} />
      <LessonPlanLayout>
        <Spinner active={select.waiting}>
          <LessonPlanHead teachers={select.teachers} />
          {rows}
        </Spinner>
      </LessonPlanLayout>
    </PageLayout>
  )
}

export default memo(TeacherLessonPlan);