import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import groupTeachersActions from '../../store/group-teachers/actions';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import {SearchOutlined} from '@ant-design/icons';
import { Collapse } from "antd";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import uniqueValues from "../../utils/unique-values";
import TeacherComponent from "../../components/teacher-component";
import Wrapper from "../../components/wrapper";
import InputSearch from "../../components/input-search";

function Teachers() {

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(groupTeachersActions.load());
  })

  const select = useSelector(state => ({
    groupTeachers: state.groupTeachers.list,
  }))

  const teachers = useMemo((arr) => {
    const teachers = [];
    uniqueValues(arr, 'teacher').forEach(teacher => {
      teachers.push({
        key: teacher.id, label: `${teacher.surname} ${teacher.name} ${teacher.patronymic}`,
        children: <TeacherComponent arr={arr.filter(gt => gt.teacher.id === teacher.id)} />
      })
    });
    return teachers;
  }, [select.groupTeachers])

  const callbacks = {
    onSearch: useCallback()
  }

  return (
    <PageLayout>
      <Header logo={logo} selected={'teachers'} />
      <LessonPlanLayout>
        <Wrapper>
          <InputSearch
          placeholder='Поиск'
          prefix={<SearchOutlined/>}
          size='large'/>
          <Collapse items={teachers(select.groupTeachers)} />
        </Wrapper>
      </LessonPlanLayout>
    </PageLayout>
  )

}

export default memo(Teachers);