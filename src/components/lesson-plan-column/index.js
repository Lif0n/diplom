import { memo, useCallback } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'
import Lesson from '../lesson';

function LessonPlanColumn({ list, weekday, group, onItemClick }) {

  const items = [];

  [1, 2, 3, 4, 5, 6].forEach((lessonNumber) => {
    const res = list.filter((item) => item.lessonNumber === lessonNumber);
    items.push(<Lesson key={res.length > 0 ? `l-${res[0].id}` : `ln-${lessonNumber} w-${weekday} g-${group.id}`} onItemClick={onItemClick} weekday={weekday} group={group} lessonNumber={lessonNumber} items={res.length > 0 ? res : ''} />);
  })

  return (
    <div className='col-2 p-0 column'>
      {items}
    </div>
  )
}

export default memo(LessonPlanColumn);