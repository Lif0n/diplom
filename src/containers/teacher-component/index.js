import { memo, useMemo, useState } from 'react';
import useInit from '../../hooks/use-init';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Card, Button } from 'antd';
import groupTeachersActions from '../../store/group-teachers/actions';
import Wrapper from '../../components/wrapper';
import uniqueValues from '../../utils/unique-values';

function TeacherComponent({ teacher }) {

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  useInit(() => {
    dispatch(groupTeachersActions.load({teacherId: teacher.id}));
  }, [teacher])

  const select = useSelector(state => ({
    groupTeachers: state.groupTeachers.list,
    waiting: state.groupTeachers.waiting
  }))

  const groupTeachers = useMemo(() => {
    return select.groupTeachers.filter((gt) => gt.teacher.id === teacher.id)
  }, [select.groupTeachers, select.waiting])

  const groups = useMemo(() => {
    const groups = [];
    uniqueValues(groupTeachers, 'group').forEach(group => {
      groups.push({
        key: group.id,
        tab: `${group.speciality.shortname}-${group.name}`
      });
    });
    if(groups.length > 0){
      setActiveTab(groups[0].key)
    }
    return groups;
  }, [groupTeachers])

  const contentList = useMemo(() => {
    const contentList = {};
    groups.forEach(group => {
      const subjs = groupTeachers.filter(groupTeacher => groupTeacher.group.id === group.key);
      contentList[group.key] = [];
      subjs.forEach(subj => {
        contentList[group.key] = [...contentList[group.key], <h6>{subj.subject.name}</h6>]
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
      <Input defaultValue={teacher.surname} style={{width: '80%'}} className='teacherSurname' size='large' addonBefore='Фамилия' />
      <Input defaultValue={teacher.name} style={{ width: '80%' }} className='teacherName' size='large' addonBefore='Имя' />
      <Input defaultValue={teacher.patronymic} style={{ width: '80%' }} className='teacherPatronymic' size='large' addonBefore='Отчество' />
      <Card key={teacher.id} title='Связи' style={{ width: '80%' }}
        extra={<Button>Добавить группу к преподавателю</Button>}
        tabList={groups} onTabChange={onTabChange} loading={select.waiting}>
        {contentList[activeTab]}
      </Card>
    </Wrapper>
  );
}

export default memo(TeacherComponent);