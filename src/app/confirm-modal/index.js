import { memo, useCallback, useState } from "react";
import ModalLayout from "../../components/modal-layout";
import modalsActions from '../../store/modals/actions';
import { useDispatch } from "react-redux";
import { Button, Flex } from "antd";

function ConfirmModal({props}){

  const dispatch = useDispatch();

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('confirmDelete'));
    })
  }

  return(
    <ModalLayout labelClose='X' title={props.title} onClose={callbacks.closeModal}>
      <Flex vertical gap='middle'>
        <h6>{props.text}</h6>
        <Flex justify="center" gap='small'>
          <Button onClick={props.onOk}>Да</Button>
          <Button onClick={callbacks.closeModal}>Нет</Button>
        </Flex>
      </Flex>
    </ModalLayout>
  )
}

export default memo(ConfirmModal);