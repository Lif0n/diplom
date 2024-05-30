import { memo, useCallback } from "react";
import ModalLayout from "../../components/modal-layout";
import modalsActions from '../../store/modals/actions';
import { Flex } from "antd";
import LessonSelect from "../../components/lesson-select";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";


function ListModal({ props }) {

  const dispatch = useDispatch();

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('list'));
    }, [dispatch]),
    onChange: useCallback((value) => {
      props.onChange(true, value);
    })
  }

  return (
    <>
    <ToastContainer position="top-center" autoClose={2000}/>
      <ModalLayout labelClose={'X'} title={props.title} onClose={callbacks.closeModal}>
        <Flex vertical gap={'large'}>
          <h6>{props.text}</h6>
          <LessonSelect placeholder={props.placeholder}
          defaultValue={null} selectOptions={props.selectOptions}
          onChange={(value) => props.onChange(true, value)}/>
        </Flex>
      </ModalLayout>
    </>
  )

}

export default memo(ListModal);