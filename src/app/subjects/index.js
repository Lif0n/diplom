import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import modalsActions from '../../store/modals/actions';
import lessonPlanActions from '../../store/lesson-plan/actions'
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import { Collapse, Button } from "antd";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import TeacherComponent from "../../containers/teacher-component";
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import Wrapper from "../../components/wrapper";
import InputSearch from "../../components/input-search";
import Spinner from "../../components/spinner";
import subjectsActions from '../../store/subjects/actions'
import { ToastContainer } from "react-toastify";
import groupsActions from '../../store/groups/actions';


function Subjects() {

    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    useInit(() => {
      dispatch(groupsActions.load());
      dispatch(subjectsActions.load())
      dispatch(teachersActions.load());
    })

    const select = useSelector(state => ({
        subjects: state.subjects.list,
        waiting: state.subjects.waiting
    }))

    return(
        <PageLayout>
        <Header logo={logo} selected={'teachers'} />
        <ToastContainer position="top-center" autoClose={2000} />
        <LessonPlanLayout>
          <Wrapper>
            <InputSearch
              value={query}
              placeholder='Поиск'
              prefix={<SearchOutlined />}
              size='large' />
            <Button type="primary">Добавить новый предмет</Button>
            <Spinner active={select.waiting}>
            </Spinner>
          </Wrapper>
        </LessonPlanLayout>
      </PageLayout>
    )
}

export default memo(Subjects);