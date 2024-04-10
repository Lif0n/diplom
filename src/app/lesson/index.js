import {memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'

function Lesson({lessonPlan}) {
  const dispatch = useDispatch();

  console.log(lessonPlan);

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('lesson'));
    })
  }

  return (
    <ModalLayout labelClose={'Х'} onClose={callbacks.closeModal}>

    </ModalLayout>
  )
}

export default memo(Lesson);