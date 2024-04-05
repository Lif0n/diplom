import {Routes, Route} from 'react-router-dom';
import LessonPlan from './lesson-plan';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {


  return (
    <>
    <Routes>
      <Route path={''} element={<LessonPlan/>}/>
    </Routes>
    </>
  )
}

export default App;