import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Flex } from 'antd';
import teachersActions from '../../store/teachers/actions';
import Wrapper from '../../components/wrapper';
import modalsActions from '../../store/modals/actions';
import './style.css'
import TeacherSubject from '../teacher-subject';
import { toast } from 'react-toastify';

//элемент со всей информацией по преподавателю
function TeacherComponent({ teacher }) {

  const dispatch = useDispatch();

  const [surname, setSurname] = useState(teacher.lastName);

  const [name, setName] = useState(teacher.firstName);

  const [patronymic, setPatronymic] = useState(teacher.middleName);

  const select = useSelector(state => ({
    query: state.teachers.query
  }))

  const putTeacher = (bool) => {
    if (bool) {
      dispatch(teachersActions.put({ ...teacher, lastName: surname, firstName: name, middleName: patronymic }));
      if (select.query) {
        dispatch(teachersActions.search(select.query));
      } else {
        dispatch(teachersActions.load());
      }
    }
  };

  const deleteTeacher = (bool) => {
    if (bool) {
      dispatch(teachersActions.delete(teacher.id));
    }
  }

  const callbacks = {
    onCancelTeacherChange: () => {
      setSurname(teacher.lastName);
      setPatronymic(teacher.middleName);
      setName(teacher.firstName);
    },
    onAcceptTeacherChange: () => {
      if (name.trim() == ''
        || surname.trim() == ''
        || patronymic.trim() == '') {
        toast.error('Все поля должны быть заполненны');
        return;
      }
      if (name.match(/[^а-яА-ЯёЁ]/)
        || surname.match(/[^а-яА-ЯёЁ]/)
        || patronymic.match(/[^а-яА-ЯёЁ]/)) {
        toast.error('Текст во всех полях должен состоять только из символов кирилиицы');
        return;
      }
      if (name.length > 30
        || surname.length > 30
        || patronymic.length > 30) {
        toast.error('Текст во всех полях не может превышать 30 символов');
        return;
      }
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы уверены, что хотите обновить данные преподавателя?',
        onOk: putTeacher
      }))
    },
    deleteTeacher: () => {
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы уверены, что хотите удалить преподавателя?',
        onOk: deleteTeacher
      }))
    }
  }

  return (
    <Wrapper>
      <Flex vertical gap='middle'>
        <Input value={surname} style={{ width: '80%' }} className='teacherSurname' size='large' addonBefore='Фамилия' onChange={(e) => setSurname(e.target.value)} />
        <Input value={name} style={{ width: '80%' }} className='teacherName' size='large' addonBefore='Имя' onChange={(e) => setName(e.target.value)} />
        <Input value={patronymic} style={{ width: '80%' }} className='teacherPatronymic' size='large' addonBefore='Отчество' onChange={(e) => setPatronymic(e.target.value)} />
        <Flex gap='middle' justify='center' style={(name == teacher.firstName && surname == teacher.lastName && patronymic == teacher.middleName) ? { display: 'none' } : { width: '80%' }}>
          <Button type='primary' onClick={callbacks.onAcceptTeacherChange}>Сохранить изменения</Button>
          <Button type='primary' onClick={callbacks.onCancelTeacherChange}>Отменить изменения</Button>
        </Flex>
        <TeacherSubject teacher={teacher} />
        <Button type='primary' danger style={{ width: '80%' }} onClick={callbacks.deleteTeacher}>Удалить преподавателя</Button>
      </Flex>
    </Wrapper>
  );
}

export default memo(TeacherComponent);