import { memo, useCallback, useState } from "react";
import ModalLayout from "../../components/modal-layout";
import modalsActions from '../../store/modals/actions';
import groupsActions from '../../store/groups/actions'
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Input } from "antd";
import Wrapper from "../../components/wrapper";
import { ToastContainer, toast } from "react-toastify";

function GroupModal({ props }) {

  const dispatch = useDispatch();

  cont [groupCode, setGroupCode] = useState('');

  const [department, setDepartment] = useState(null);

  const select = useSelector(state => ({
    groups: state.groups.list
  }))

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('newGroup'))
    }, [dispatch]),

    addGroup: useCallback(() => {
      if(select.groups.find(group => {
        return group.groupCode.toLowerCase() == groupCode.toLowerCase()
      })) {
        toast.error('Такая группа уже есть');
        return;
      }
      if(groupCode.trim() == '' || department == null) {
        toast.error('Все поля должны быть заполненны');
        return;
      }
      if(!/[а-яА-Я]{2,5}-\d{2}[а-яА-Я]?$/.test(groupCode)){
        toast.error('Проверьте правильность заполнения кода группы');
        return;
      }
      dispatch(groupsActions.post({ groupCode: groupCode, department: department }));
      dispatch(modalsActions.close('newGroup'))
    })
  }




  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <ModalLayout labelClose='X' title='Добавление новой группы' onClose={callbacks.closeModal}>
        <Wrapper>
          <Flex vertical gap='large' style={{ margin: '15px 0px' }} >
            <Input value={null} className='teacherSurname' size='large' placeholder='Код группы' />
            <LessonSelect placeholder='Отделение'
              defaultValue={null}
              onChange={(value) => setDepartment(value)}
              selectOptions={[{ value: 1, label: 'Первое' }, { value: 2, label: 'Второе' }]} />          <Button type="primary" onClick={callbacks.addTeacher}>Добавить группу</Button>
          </Flex>
        </Wrapper>
      </ModalLayout>
    </>
  )
}

export default memo(GroupModal)