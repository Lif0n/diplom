import { memo, useCallback, useState } from "react";
import ModalLayout from "../../components/modal-layout";
import modalsActions from '../../store/modals/actions';
import teachersActions from '../../store/teachers/actions'
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Input } from "antd";
import Wrapper from "../../components/wrapper";
import { ToastContainer, toast } from "react-toastify";

function GroupModal({props}) {

  const dispatch = useDispatch();

  const callbacks = { 
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('newGroup'))
    }, [dispatch]),
  }


  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
    <ModalLayout labelClose='X' title='Добавление новой группы' onClose={callbacks.closeModal}>
      <Wrapper>
        <Flex vertical gap='large' style={{ margin: '15px 0px' }} >
          <Input value={null} className='teacherSurname' size='large' placeholder='Код группы' />
          <Input value={null} className='teacherPatronymic' size='large' placeholder='Отделение' />
          <Button type="primary" onClick={callbacks.addTeacher}>Добавить группу</Button>
        </Flex>
      </Wrapper>
    </ModalLayout>
  </>
  )
}

export default memo(GroupModal)