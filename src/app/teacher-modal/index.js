import { memo, useCallback, useState } from "react";
import ModalLayout from "../../components/modal-layout";
import modalsActions from '../../store/modals/actions';
import teachersActions from '../../store/teachers/actions'
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Input } from "antd";
import Wrapper from "../../components/wrapper";
import { ToastContainer, toast } from "react-toastify";

function TeacherModal({ props }) {
  const dispatch = useDispatch();

  const [surname, setSurname] = useState('');

  const [name, setName] = useState('');

  const [patronymic, setPatronymic] = useState('');

  const select = useSelector(state => ({
    teachers: state.teachers.list
  }))

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('newTeacher'))
    }, [dispatch]),
    addTeacher: useCallback(() => {
      if (select.teachers.find(teacher => {
        return (teacher.name.toLowerCase() == name.trim().toLowerCase()
          && teacher.surname.toLowerCase() == surname.trim().toLowerCase()
          && teacher.patronymic.toLowerCase() == patronymic.trim().toLowerCase());
      })) {
        toast.error('Такой преподаватель уже есть');
        return;
      }
      if (name.trim() == ''
        || surname.trim() == ''
        || patronymic.trim() == '') {
        toast.error('Все поля должны быть заполненны');
        return;
      }
      dispatch(teachersActions.post({ name: name, surname: surname, patronymic: patronymic }));
      dispatch(modalsActions.close('newTeacher'))
    }, [patronymic, name, surname])
  }

  return (
    <>
    <ToastContainer position="top-center" autoClose={2000}/>
      <ModalLayout labelClose='X' title='Добавление нового преподавателя' onClose={callbacks.closeModal}>
        <Wrapper>
          <Flex vertical gap='large' style={{ margin: '15px 0px' }} >
            <Input value={surname} className='teacherSurname' size='large' placeholder='Фамилия' onChange={(e) => setSurname(e.target.value)} />
            <Input value={name} className='teacherName' size='large' placeholder='Имя' onChange={(e) => setName(e.target.value)} />
            <Input value={patronymic} className='teacherPatronymic' size='large' placeholder='Отчество' onChange={(e) => setPatronymic(e.target.value)} />
            <Button type="primary" onClick={callbacks.addTeacher}>Добавить преподавателя</Button>
          </Flex>
        </Wrapper>
      </ModalLayout>
    </>
  )
}

export default memo(TeacherModal);