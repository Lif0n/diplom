import { Routes, Route } from 'react-router-dom';
import LessonPlan from './lesson-plan';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import LessonModal from './lesson-modal';
import Teachers from './teachers';
import Groups from './groups'
import ConfirmModal from './confirm-modal';
import TeacherModal from './teacher-modal';
import ListModal from './list-modal';
import ScheduleModal from './schedule-modal';

function App() {

  const activeModals = useSelector(state => state.modals.list);

  return (
    <>
      <Routes>
        {['', 'lesson-plan'].map(path => <Route key={path} path={path} element={<LessonPlan />} />)}
        <Route path={'teachers'} element={<Teachers />} />
        <Route path={'groups'} element={<Groups />} />
        <Route path={'subjects'} />
      </Routes>

      {activeModals.some(item => {
        return item.name === 'lesson'
      }) && <LessonModal lessonPlan={activeModals.find((item) => {
        return item.name === 'lesson'
      }).params.item} notChangeWeek={activeModals.find((item) => {
        return item.name === 'lesson'
      }).params.notChangeWeek} />}

      {activeModals.some(item => {
        return item.name === 'confirm'
      }) && <ConfirmModal props={activeModals.find((item) => {
        return item.name === 'confirm'
      }).params} />}

      {activeModals.some(item => {
        return item.name === 'newTeacher'
      }) && <TeacherModal props={activeModals.find((item) => {
        return item.name === 'newTeacher'
      }).params} />}

      {activeModals.some(item => {
        return item.name === 'list'
      }) && <ListModal props={activeModals.find((item) => {
        return item.name === 'list'
      }).params} />}

      {activeModals.some(item => {
        return item.name === 'schedule'
      }) && <ScheduleModal props={activeModals.find((item) => {
        return item.name === 'schedule'
      }).params} />}
    </>
  )
}

export default App;