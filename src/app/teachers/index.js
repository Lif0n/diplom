import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import { SearchOutlined } from '@ant-design/icons';
import { Collapse } from "antd";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import TeacherComponent from "../../containers/teacher-component";
import Wrapper from "../../components/wrapper";
import InputSearch from "../../components/input-search";
import Spinner from "../../components/spinner";

function Teachers() {

  const dispatch = useDispatch();

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
    onSearch: useCallback()
  }

  return (
    <PageLayout>
      <Header logo={logo} selected={'teachers'} />
      <Spinner active={select.waiting}>
        <LessonPlanLayout>
          <Wrapper>
            <InputSearch
              placeholder='Поиск'
              prefix={<SearchOutlined />}
              size='large' />
            <Collapse items={teachers} />
          </Wrapper>
        </LessonPlanLayout>
      </Spinner>
    </PageLayout>
  )

}

export default memo(Teachers);