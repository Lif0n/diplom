import { memo, useCallback, useState, createRef } from "react";
import ModalLayout from "../../components/modal-layout";
import modalsActions from '../../store/modals/actions';
import StyledDropzone from '../../components/dropzone'
import { Button, Flex, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/wrapper";
import LessonSelect from "../../components/lesson-select";
import { ToastContainer, toast } from "react-toastify";
import Dropzone from 'react-dropzone'

function ScheduleModal({ props }) {

  const dispatch = useDispatch();

  const [year, setYear] = useState('');

  const [department, setDepartment] = useState(null);

  const [file, setFile] = useState(null);

  const [semester, setSemester] = useState('');

  const [status, setStatus] = useState(null);

  const select = useSelector(state => ({
    schedules: state.schedules.list
  }))

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('schedule'))
    }, [dispatch]),

    addSchedule: useCallback(() => {
      if((year.match(/[\D]/)) || (parseInt(year, 10) < 1000 || parseInt(year, 10) > (new Date().getFullYear() + 3)) || year.trim().length == 0) {
        toast.error('Введен неверный год');
        return;
      }
      if(parseInt(semester, 10) > 2 || parseInt(semester, 10) < 0 || semester.match(/[\D]/) || semester.trim().length == 0) {
        toast.error('Введен неверный семестр');
        return;
      }
      if(department == null){
        toast.error('Не выбрано отделение');
        return;
      }
      if(status == null){
        toast.error('Не выбран статус');
        return;
      }
    })
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <ModalLayout labelClose='X' title='Добавление нового расписания' onClose={callbacks.closeModal}>
        <Wrapper>
          <Flex vertical gap='large' style={{ margin: '15px 0px' }}>
            <Input value={year} size='large' placeholder="Учебный год" onChange={(e) => setYear(e.target.value)} />
            <Input value={semester} size='large' placeholder="Семестр" onChange={(e) => setSemester(e.target.value)} />
            <LessonSelect placeholder={'Отделение'}
            value={department}
            selectOptions={[{ value: 1, label: 'Первое' }, { value: 2, label: 'Второе' }]}
            onChange={(e) => setDepartment(e)}/>
            <LessonSelect placeholder={'Статус'}
              value={status}
              selectOptions={[{ value: 1, label: 'Завершенное' }, { value: 2, label: 'Черновик' }]}
              onChange={(e) => setStatus(e)} />
            <StyledDropzone setFile={setFile}/>
            <Button onClick={callbacks.addSchedule}>Загрузить расписание</Button>
          </Flex>
        </Wrapper>
      </ModalLayout>
    </>
  )
}

export default memo(ScheduleModal)