import {Routes, Route} from 'react-router-dom';
import LessonPlan from './lesson-plan';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import Lesson from './lesson';
import TeacherLessonPlan from './teacher-lesson-plan';

function App() {

  const activeModals = useSelector(state => state.modals.list);

  return (
    <>
    <Routes>
      <Route path={''} element={<LessonPlan/>}/>
      {/* <Route path='teacher-lesson-plan' element={<TeacherLessonPlan/>}/> */}
    </Routes>

    {activeModals.some(item => {
      return item.name === 'lesson'
    }) && <Lesson lessonPlan={activeModals.find((item) => {
      return item.name === 'lesson'
    }).params}/>}
    </>
  )
}

export default App;