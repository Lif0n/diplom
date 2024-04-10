import {memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'

function Lesson({lessonPlan}) {
  const dispatch = useDispatch();

  console.log(lessonPlan);

  const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];
  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('lesson'));
    })
  }

  return (
    <ModalLayout labelClose={'Х'} onClose={callbacks.closeModal}
     title={`${lessonPlan.group.speciality.shortname}-${lessonPlan.group?.name}, ${weekdays[lessonPlan.weekday-1]}, ${lessonPlan.lessonNumber}-я пара`}>

    </ModalLayout>
  )
}

export default memo(Lesson);