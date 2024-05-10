import { memo, useCallback, useMemo, useState } from 'react';
import useInit from '../../hooks/use-init';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Card, Button, Tabs, Flex } from 'antd';
import groupTeachersActions from '../../store/group-teachers/actions';
import Wrapper from '../../components/wrapper';
import uniqueValues from '../../utils/unique-values';
import modalsActions from '../../store/modals/actions';
import './style.css'
import TeacherSubjectComponent from '../../components/teacher-subject-component';

function TeacherComponent({ teacher }) {

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  useInit(() => {
    dispatch(groupTeachersActions.load({ teacherId: teacher.id }));
  }, [teacher])

  const select = useSelector(state => ({
    groupTeachers: state.groupTeachers.list,
    waiting: state.groupTeachers.waiting,
    modals: state.modals.list
  }))

  const groupTeachers = useMemo(() => {
    return select.groupTeachers.filter((gt) => gt.teacher.id === teacher.id)
  }, [select.groupTeachers, select.waiting])

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
  }, [groupTeachers])
  
  const callbacks = {
    openConfirmDelete: useCallback(() => {
      dispatch(modalsActions.open('confirmDelete', {title: 'Внимание', text: 'Вы уверены, что хотите удалить предмет у преподавателя?'}));
    })
  }

  const contentList = useMemo(() => {
    const contentList = {};
    groups.forEach(group => {
      const subjs = groupTeachers.filter(groupTeacher => groupTeacher.group.id === group.key);
      contentList[group.key] = [];
      subjs.forEach(subj => {
        contentList[group.key] = [...contentList[group.key], <TeacherSubjectComponent subject={subj.subject} onDelete={callbacks.openConfirmDelete}/>]
      });
      contentList[group.key] = [...contentList[group.key], <Button>Добавить предмет</Button>]
    });
    return contentList;
  }, [groupTeachers, groups])

  const onTabChange = (key) => {
    setActiveTab(key);
  }

  return (
    <Wrapper>
      <Flex vertical gap='middle'>
        <Input defaultValue={teacher.surname} style={{ width: '80%' }} className='teacherSurname' size='large' addonBefore='Фамилия' />
        <Input defaultValue={teacher.name} style={{ width: '80%' }} className='teacherName' size='large' addonBefore='Имя' />
        <Input defaultValue={teacher.patronymic} style={{ width: '80%' }} className='teacherPatronymic' size='large' addonBefore='Отчество' />
        <Card key={teacher.id} title='Связи' style={{ width: '80%' }}
          extra={<Button>Добавить группу к преподавателю</Button>}
          loading={select.waiting}>
          <Tabs items={groups} onChange={onTabChange} activeKey={activeTab} />
          <Flex vertical gap='middle'>
            {contentList[activeTab]}
          </Flex>
        </Card>
      </Flex>
    </Wrapper>
  );
}

export default memo(TeacherComponent);