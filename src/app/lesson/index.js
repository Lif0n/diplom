import {memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'

function Lesson() {
  const dispatch = useDispatch();

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close());
    })
  }

  return (
    <ModalLayout labelClose={'Х'} onClose={callbacks.closeModal}>

    </ModalLayout>
  )
}

export default memo(Lesson);