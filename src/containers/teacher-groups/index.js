import { Card, Flex, Tabs, Button } from "antd";
import useInit from '../../hooks/use-init';
import subjectsActions from '../../store/subjects/actions'
import modalsActions from '../../store/modals/actions'
import groupTeachersActions from '../../store/group-teachers/actions';
import TeacherSubjectComponent from '../teacher-subject-component'
import groupsActions from '../../store/groups/actions'
import LessonSelect from '../../components/lesson-select'
import uniqueValues from '../../utils/unique-values';
import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


//карточка с группами и предметами преподавателя
function TeacherGroup({ teacher }) {

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  const [newGroups, setNewGroups] = useState([]);

  useInit(() => {
    dispatch(groupTeachersActions.load({ teacherId: teacher.id }));
    dispatch(subjectsActions.load());
    dispatch(groupsActions.load())
  }, [teacher])

  const select = useSelector(state => ({
    groupTeachers: state.groupTeachers.list,
    subjects: state.subjects.list,
    waitingGroupTeachers: state.groupTeachers.waiting,
    waitingSubjects: state.subjects.waiting,
    groups: state.groups.list
  }))

  const groupTeachers = useMemo(() => {
    return select.groupTeachers.filter((gt) => gt.teacher.id === teacher.id)
  }, [select.groupTeachers, select.waitingGroupTeachers])

  const groups = uniqueValues(groupTeachers, 'group').map(group => ({
    key: group.id,
    label: `${group.groupCode}`
  })).concat(newGroups);

  const putSubject = (bool, value) => {
    if (bool) {
      const group = select.groups.find(g => g.id == activeTab);
      dispatch(groupTeachersActions.post({ teacher: teacher, subject: value, group: group }));
      setNewGroups([]);
    }
  }

  const putGroup = (bool, value) => {
    if (bool) {
      if (groups.some((group) => group.key == value)) {
        toast.error('Такая группа уже есть у преподавателя');
        return;
      }
      setNewGroups([...newGroups, {
        key: value,
        label: select.groups.find(group => group.id == value).groupCode
      }]);
      dispatch(modalsActions.close('list'));
    }
  }

  const callbacks = {
    onTabChange: useCallback((key) => {
      setActiveTab(key);
    }, [groups, newGroups]),
    onAcceptAddSubject: (value) => {
      const newSubject = select.subjects.find(s => s.id == value);
      const group = select.groups.find(g => g.id == activeTab);
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: `Вы уверены, что хотите добавить ${newSubject.name}
         в группе ${group?.groupCode} к ${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`,
        value: newSubject,
        onOk: putSubject
      }))
    },
    onAddGroup: () => {
      dispatch(modalsActions.open('list', {
        title: 'Добавление группы к преподавателю',
        text: 'Выберите группу',
        placeholder: 'Группы',
        selectOptions: select.groups.map((group) => {
          return {
            value: group.id,
            label: group.groupCode
          }
        }),
        onChange: putGroup
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
      extra={<Button onClick={callbacks.onAddGroup}>Добавить группу к преподавателю</Button>}
      loading={select.waiting}>
      <Tabs items={groups} onChange={callbacks.onTabChange} activeKey={activeTab} />
      <Flex vertical gap='middle'>
        {contentList[activeTab]}
      </Flex>
    </Card>
  )
}

export default memo(TeacherGroup);