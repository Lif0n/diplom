import { Card, Flex, Tabs, Button } from "antd";
import useInit from '../../hooks/use-init';
import subjectsActions from '../../store/subjects/actions'
import modalsActions from '../../store/modals/actions'
import groupTeachersActions from '../../store/group-teachers/actions';
import TeacherSubjectComponent from '../teacher-subject-component'
import LessonSelect from '../../components/lesson-select'
import uniqueValues from '../../utils/unique-values';
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


//карточка с группами и предметами преподавателя
function TeacherGroup({ teacher }) {

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  useInit(() => {
    dispatch(groupTeachersActions.load({ teacherId: teacher.id }));
    dispatch(subjectsActions.load());
  }, [teacher])

  const select = useSelector(state => ({
    groupTeachers: state.groupTeachers.list,
    subjects: state.subjects.list,
    waitingGroupTeachers: state.groupTeachers.waiting,
    waitingSubjects: state.subjects.waiting,
  }))

  const groupTeachers = useMemo(() => {
    return select.groupTeachers.filter((gt) => gt.teacher.id === teacher.id)
  }, [select.groupTeachers, select.waitingGroupTeachers])

  const groups = useMemo(() => {
    const groups = [];
    uniqueValues(groupTeachers, 'group').forEach(group => {
      groups.push({
        key: group.id,
        label: `${group.speciality.shortname}-${group.name}`
      });
    });
    if (groups.length > 0) {
      setActiveTab(groups[0].key)
    }
    return groups;
  }, [groupTeachers, select.groupTeachers])

  const putSubject = (bool, value) => {
    if (bool) {
      const group = uniqueValues(groupTeachers, 'group').find(g => g.id == activeTab);
      console.log({ teacher: teacher, subject: value, group: group });
      dispatch(groupTeachersActions.post({ teacher: teacher, subject: value, group: group }));
    }
  }

  const callbacks = {
    onTabChange: (key) => {
      setActiveTab(key);
    },
    onAcceptAddSubject: (value) => {
      const newSubject = select.subjects.find(s => s.id == value);
      const group = uniqueValues(groupTeachers, 'group').find(g => g.id == activeTab);
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: `Вы уверены, что хотите добавить ${newSubject.name}
         в группе ${group?.speciality?.shortname}-${group.name} к ${teacher.surname} ${teacher.name[0]}. ${teacher.patronymic[0]}.`,
        value: newSubject,
        onOk: putSubject
      }))
    }
  }

  const contentList = useMemo(() => {
    const contentList = {};
    groups.forEach(group => {
      const subjs = groupTeachers.filter(groupTeacher => groupTeacher.group.id === group.key);
      contentList[group.key] = [];
      subjs.forEach(subj => {
        contentList[group.key] = [...contentList[group.key], <TeacherSubjectComponent groupTeacher={subj} />]
      });
      contentList[group.key] = [...contentList[group.key],
      <LessonSelect placeholder='Добавить предмет'
        defaultValue={null}
        selectOptions={select.subjects.map((subject) => {
          return {
            value: subject.id,
            label: subject.name
          }
        })}
        onChange={(value) => {
          callbacks.onAcceptAddSubject(value);
        }} />]
    });
    return contentList;
  }, [groupTeachers, groups, select.subjects])

  return (
    <Card key={teacher.id} title='Связи' style={{ width: '80%' }}
      extra={<Button>Добавить группу к преподавателю</Button>}
      loading={select.waiting}>
      <Tabs items={groups} onChange={callbacks.onTabChange} activeKey={activeTab} />
      <Flex vertical gap='middle'>
        {contentList[activeTab]}
      </Flex>
    </Card>
  )
}

export default memo(TeacherGroup);