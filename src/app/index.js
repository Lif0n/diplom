import {Routes, Route} from 'react-router-dom';
import LessonPlan from './lesson-plan';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import LessonModal from './lesson-modal';
import TeacherLessonPlan from './teacher-lesson-plan';
import Teachers from './teachers';

function App() {

  const activeModals = useSelector(state => state.modals.list);

  return (
    <>
    <Routes>
      {['', 'lesson-plan'].map(path => <Route key={path} path={path} element={<LessonPlan/>}/>)}
      <Route path={'teachers'} element={<Teachers/>}/>
      {/* <Route path='teacher-lesson-plan' element={<TeacherLessonPlan/>}/> */}
    </Routes>

    {activeModals.some(item => {
      return item.name === 'lesson'
    }) && <LessonModal lessonPlan={activeModals.find((item) => {
      return item.name === 'lesson'
    }).params.item} notChangeWeek={activeModals.find((item) => {
      return item.name === 'lesson'
    }).params.notChangeWeek}/>}
    </>
  )
}

export default App;