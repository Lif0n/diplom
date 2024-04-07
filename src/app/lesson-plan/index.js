import { memo } from "react";
import {useDispatch, useSelector} from 'react-redux';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import groupsActions from '../../store/groups/actions'
import useInit from "../../hooks/use-init";
import logo from '../../img/logo.png';

function LessonPlan() {

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(groupsActions.load());
  })

  const select = useSelector(state => ({
    groups: state.groups.list,
  }));

  console.log(select.groups);

  return(
    <PageLayout>
      <Header logo={logo}/>
    </PageLayout>
  )
}

export default memo(LessonPlan);