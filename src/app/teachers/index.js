import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import groupTeachersActions from '../../store/group-teachers/actions';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import { Collapse, Input } from "antd";
import LessonPlanLayout from "../../components/lesson-plan-layout";
import uniqueValues from "../../utils/unique-values";
import TeacherComponent from "../../components/teacher-component";
import Wrapper from "../../components/wrapper";

function Teachers() {

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(groupTeachersActions.load());
  })

  const select = useSelector(state => ({
    groupTeachers: state.groupTeachers.list,
  }))

  const teachers = useMemo(() => {
    const teachers = [];
    uniqueValues(select.groupTeachers, 'teacher').forEach(teacher => {
      teachers.push({
        key: teacher.id, label: `${teacher.surname} ${teacher.name} ${teacher.patronymic}`,
        children: <TeacherComponent arr={select.groupTeachers.filter(gt => gt.teacher.id === teacher.id)} />
      })
    });
    return teachers;
  }, [select.groupTeachers])

  return (
    <PageLayout>
      <Header logo={logo} selected={'teachers'} />
      <LessonPlanLayout>
        <Wrapper>
          <Input className="mt-2" placeholder="Поиск"/>
          <Collapse items={teachers} />
        </Wrapper>
      </LessonPlanLayout>
    </PageLayout>
  )

}

export default memo(Teachers);