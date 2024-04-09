import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'
import Lesson from '../lesson';

function LessonPlanColumn({list}) {

  const items = [];

  for(let lessonNumber = 1; lessonNumber < 7; lessonNumber++){
    const res = list.filter((item) => item.lessonNumber === lessonNumber);
    items.push(<Lesson items={res.length > 0 ? res : ''}/>);
  }

  return(
    <div className='col-2 p-0 column'>
      {items}
    </div>
  )
}

export default memo(LessonPlanColumn);