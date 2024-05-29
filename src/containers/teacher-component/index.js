import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Flex } from 'antd';
import teachersActions from '../../store/teachers/actions';
import Wrapper from '../../components/wrapper';
import modalsActions from '../../store/modals/actions';
import './style.css'
import TeacherGroups from '../teacher-groups';

//элемент со всей информацией по преподавателю
function TeacherComponent({ teacher }) {

  const dispatch = useDispatch();

  const [surname, setSurname] = useState(teacher.surname);

  const [name, setName] = useState(teacher.name);

  const [patronymic, setPatronymic] = useState(teacher.patronymic);

  const select = useSelector(state => ({
    query: state.teachers.query,
  }))

  const putTeacher = (bool) => {
    if (bool) {
      dispatch(teachersActions.put({ ...teacher, surname: surname, name: name, patronymic: patronymic }));
      if (select.query) {
        dispatch(teachersActions.search(select.query));
      } else {
        dispatch(teachersActions.load());
      }
    }
  }

  const callbacks = {
    onCancelTeacherChange: () => {
      setSurname(teacher.surname);
      setPatronymic(teacher.patronymic);
      setName(teacher.name);
    },
    onAcceptTeacherChange: () => {
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы уверены, что хотите обновить данные преподавателя?',
        onOk: putTeacher
      }))
    }
  }

  return (
    <Wrapper>
      <Flex vertical gap='middle'>
        <Input value={surname} style={{ width: '80%' }} className='teacherSurname' size='large' addonBefore='Фамилия' onChange={(e) => setSurname(e.target.value)} />
        <Input value={name} style={{ width: '80%' }} className='teacherName' size='large' addonBefore='Имя' onChange={(e) => setName(e.target.value)} />
        <Input value={patronymic} style={{ width: '80%' }} className='teacherPatronymic' size='large' addonBefore='Отчество' onChange={(e) => setPatronymic(e.target.value)} />
        <Flex gap='middle' justify='center' style={(name == teacher.name && surname == teacher.surname && patronymic == teacher.patronymic) ? { display: 'none' } : { width: '80%' }}>
          <Button type='primary' onClick={callbacks.onAcceptTeacherChange}>Сохранить изменения</Button>
          <Button type='primary' onClick={callbacks.onCancelTeacherChange}>Отменить изменения</Button>
        </Flex>
        <TeacherGroups teacher={teacher} />
      </Flex>
    </Wrapper>
  );
}

export default memo(TeacherComponent);