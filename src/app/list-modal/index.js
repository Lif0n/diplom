import { memo } from "react";
import ModalLayout from "../../components/modal-layout";
import { Flex } from "antd";


function ListModal({ props }) {

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('list'));
    }),
  }

  return (
    <>
      <ModalLayout labelClose={'X'} title={props.title}>
        <Flex vertical gap={'large'}>
          <h6>{props.text}</h6>
          
        </Flex>
      </ModalLayout>
    </>
  )

}

export default memo(ListModal);