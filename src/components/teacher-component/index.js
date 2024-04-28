import { memo, useMemo, useState } from 'react'
import { cn as bem } from '@bem-react/classname';
import Spinner from '../spinner/index'
import { Input, Card, Button } from 'antd';
import './style.css'
import Wrapper from '../wrapper';
import uniqueValues from '../../utils/unique-values';

function TeacherComponent({ arr }) {

  const groups = useMemo(() => {
    const groups = [];
    uniqueValues(arr, 'group').forEach(group => {
      groups.push({
        key: group.id,
        tab: `${group.speciality.shortname}-${group.name}`
      });
    });
    return groups;
  }, [arr])

  const contentList = useMemo(() => {
    const contentList = {};
    groups.forEach(group => {
      const subjs = arr.filter(groupTeacher => groupTeacher.group.id === group.key);
      contentList[group.key] = <div>
        {subjs.forEach(subj => {
          return <h4>{subj.subject.name}</h4>
        })}
      </div>
      // subjs.forEach(subj => {
      //   console.log(subj);
      //   contentList[group.key] = <h4>{subj.subject.name}</h4>
      // });
    })
    return contentList;
  }, [arr, groups])

  const [activeTab, setActiveTab] = useState(groups[0].id);

  const onTabChange = (key) => {
    setActiveTab(key);
  }

  console.log(contentList);

  return (
    <Wrapper>
      <Input defaultValue={arr[0].teacher.surname} style={{ maxWidth: '800px' }} className='teacherSurname' size='large' addonBefore='Фамилия' />
      <Input defaultValue={arr[0].teacher.name} style={{ maxWidth: '800px' }} className='teacherName' size='large' addonBefore='Имя' />
      <Input defaultValue={arr[0].teacher.patronymic} style={{ maxWidth: '800px' }} className='teacherPatronymic' size='large' addonBefore='Отчество' />
      <Card title='Связи' style={{ maxWidth: '800px' }}
        extra={<Button>Добавить группу к преподавателю</Button>}
        tabList={groups} onTabChange={onTabChange}>
        {contentList[activeTab]}
      </Card>
    </Wrapper>
  );
}

export default memo(TeacherComponent);