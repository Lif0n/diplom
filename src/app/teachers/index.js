import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import modalsActions from '../../store/modals/actions';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import { SearchOutlined } from '@ant-design/icons';
import { Collapse, Button } from "antd";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import TeacherComponent from "../../containers/teacher-component";
import Wrapper from "../../components/wrapper";
import InputSearch from "../../components/input-search";
import Spinner from "../../components/spinner";

function Teachers() {

  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  useInit(() => {
    dispatch(teachersActions.load());
  })

  const select = useSelector(state => ({
    teachers: state.teachers.list,
    waiting: state.teachers.waiting
  }))

  const teachers = useMemo(() => {
    const teachers = [];
    select.teachers.forEach(teacher => {
      teachers.push({
        key: teacher.id, label: `${teacher.surname} ${teacher.name} ${teacher.patronymic}`,
        children: <TeacherComponent teacher={teacher} />
      })
    });
    return teachers;
  }, [select.teachers])

  const callbacks = {
    onSearch: useCallback(query => {
      dispatch(teachersActions.search(query));
      setQuery(query);
    }),
    newTeacher: () => {
      dispatch(modalsActions.open('newTeacher'))
    }
  }

  return (
    <PageLayout>
      <Header logo={logo} selected={'teachers'} />
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