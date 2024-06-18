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
import lessonGroupsActions from '../../store/lesson-group/actions';

function Teachers() {

  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  useInit(() => {
    dispatch(subjectsActions.load())
    dispatch(teachersActions.load());
  })

  const select = useSelector(state => ({
    teachers: state.teachers.list,
    waiting: state.teachers.waiting
  }))

  const callbacks = {
    onSearch: useCallback(query => {
      dispatch(teachersActions.search(query));
      setQuery(query);
    }),
    newTeacher: () => {
      dispatch(modalsActions.open('newTeacher'))
    },
    onDownload: useCallback(props => {
      dispatch(lessonPlanActions.getPDF(props))
    }, [dispatch])
  }

  const onDownload = (props) => (
    <DownloadOutlined onClick={() => callbacks.onDownload(props)} />
  )

  const teachers = useMemo(() => {
    const teachers = [];
    select.teachers.forEach(teacher => {
      teachers.push({
        key: teacher.id,
        label: `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`,
        children: <TeacherComponent teacher={teacher} />,
        extra: onDownload({teacherId: teacher.id, name: `${teacher.lastName} ${teacher.firstName[0]} ${teacher.middleName[0]}`})
      })
    });
    return teachers;
  }, [select.teachers])

  return (
    <PageLayout>
      <Header logo={logo} selected={'teachers'} />
      <ToastContainer position="top-center" autoClose={2000} />
      <LessonPlanLayout>
        <Wrapper>
          <InputSearch
            value={query}
            placeholder='Поиск'
            prefix={<SearchOutlined />}
            size='large' onChange={callbacks.onSearch} />
          <Button type="primary" onClick={callbacks.newTeacher}>Добавить нового преподавателя</Button>
          <Spinner active={select.waiting}>
            <Collapse items={teachers} />
          </Spinner>
        </Wrapper>
      </LessonPlanLayout>
    </PageLayout>
  )

}

export default memo(Teachers);