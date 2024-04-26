import { memo, useMemo } from 'react'
import { cn as bem } from '@bem-react/classname';
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

  return (
    <Wrapper>
      <Input defaultValue={arr[0].teacher.surname} style={{maxWidth:'800px'}} className='teacherSurname' size='large' addonBefore='Фамилия' />
      <Input defaultValue={arr[0].teacher.name} style={{maxWidth:'800px'}} className='teacherName' size='large' addonBefore='Имя' />
      <Input defaultValue={arr[0].teacher.patronymic} style={{maxWidth:'800px'}} className='teacherPatronymic' size='large' addonBefore='Отчество' />
      <Card title='Связи' style={{maxWidth:'800px'}}
        extra={<Button>Добавить группу к преподавателю</Button>}
        tabList={groups}>

      </Card>
    </Wrapper>
  );
}

export default memo(TeacherComponent);