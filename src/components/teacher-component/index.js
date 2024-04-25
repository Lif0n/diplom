import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import { Input } from 'antd';
import './style.css'

function TeacherComponent({arr}) {


  return (
    <div>
      <Input defaultValue={arr[0].teacher.surname} className='teacherSurname' size='large' addonBefore='Фамилия'/>
      <Input defaultValue={arr[0].teacher.name} className='teacherName' size='large' addonBefore='Имя'/>
      <Input defaultValue={arr[0].teacher.patronymic} className='teacherPatronymic' size='large' addonBefore='Отчество'/>
    </div>
  );
}

export default memo(TeacherComponent);