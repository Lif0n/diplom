import {Routes, Route} from 'react-router-dom';
import LessonPlan from './lesson-plan';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import Lesson from './lesson';

function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
    <Routes>
      <Route path={''} element={<LessonPlan/>}/>
    </Routes>

    {activeModal === 'lesson' && <Lesson/>}
    </>
  )
}

export default App;