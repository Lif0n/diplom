import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions'
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';

function Teachers() {

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(teachersActions.load());
  })

  const select = useSelector(state => ({
    teachers: state.teachers.list,
  }))

  return(
    <PageLayout>
      <Header logo={logo} selected={'teachers'}/>
    </PageLayout>
  )

}

export default memo(Teachers);