import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalsActions from '../../store/modals/actions';
import ModalLayout from '../../components/modal-layout'
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import subjectsActions from '../../store/subjects/actions';
import groupTeachersActions from '../../store/group-teachers/actions';
import Spinner from "../../components/spinner";
import { Select } from "antd";

function Lesson({ lessonPlan }) {
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(teachersActions.load());
    dispatch(subjectsActions.load());
    dispatch(groupTeachersActions.load(lessonPlan.group.id));
  })

  const select = useSelector(state => ({
    teachers: state.teachers.list,
    groupTeachers: state.groupTeachers.list,
    subjects: state.subjects.list,
    waiting: state.subjects.waiting && state.groupTeachers.waiting && state.teachers.waiting,
  }))

  const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];

  const callbacks = {
    closeModal: useCallback(() => {
      dispatch(modalsActions.close('lesson'));
    })
  }

  return (
    <ModalLayout labelClose={'Х'} onClose={callbacks.closeModal}
      title={`${lessonPlan.group.speciality.shortname}-${lessonPlan.group?.name}, ${weekdays[lessonPlan.weekday - 1]}, ${lessonPlan.lessonNumber}-я пара`}>
      <Spinner active={select.waiting}>
        <Select style={{ zIndex: 10, width: '50%', transform: 'translate(-50%)', left: '50%', margin: '15px 0px' }} size="large"
          defaultValue={lessonPlan.subject && lessonPlan.subject.id}
          showSearch
          placeholder='Предмет'
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          options={select.subjects.map((subject) => {
            return {
              value: subject.id,
              label: subject.name
            }
          })} />
        <Select style={{ zIndex: 10, width: '50%', transform: 'translate(-50%)', left: '50%', margin: '15px 0px' }} size="large"
          defaultValue={lessonPlan.teachers && lessonPlan.teachers[0] && lessonPlan.teachers[0].id}
          showSearch
          placeholder='Основной преподаватель'
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          options={select.teachers.map((teacher) => {
            return {
              value: teacher.id,
              label: `${teacher.surname} ${teacher.name}. ${teacher.patronymic}`
            }
          })} />
        <Select style={{ zIndex: 10, width: '50%', transform: 'translate(-50%)', left: '50%', margin: '15px 0px' }} size="large"
          defaultValue={lessonPlan.teachers && lessonPlan.teachers[1] && lessonPlan.teachers[1].id}
          showSearch
          placeholder='Запасной преподаватель'
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          options={select.teachers.map((teacher) => {
            return {
              value: teacher.id,
              label: `${teacher.surname} ${teacher.name}. ${teacher.patronymic}`
            }
          })} />
      </Spinner>
    </ModalLayout>
  )
}

export default memo(Lesson);