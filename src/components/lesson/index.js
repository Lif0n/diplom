import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'
import LessonContent from '../lesson-content';

function Lesson({ items, weekday, group, onItemClick, lessonNumber }) {

  const cn = bem('Lesson');

  const callbacks = {
    onEmptyClick: (e) => onItemClick({lessonNumber: lessonNumber, weekday: weekday, group: group}),
  }

  return (
    <div className={'row border m-1 p-0 ' + cn()}>
      {items.length === 1 && items[0].weekNumber === 0 && <LessonContent item={items[0]} onItemClick={onItemClick}/>}
      {items.length === 2 &&
        <>
          <div className='border' style={{ height: '50%' }}>
            <LessonContent item={items[0]} onItemClick={onItemClick}/>
          </div>
          <div className='border' style={{ height: '50%' }}>
            <LessonContent item={items[1]} onItemClick={onItemClick}/>
          </div>
        </>
      }
      {items.length === 1 && items[0].weekNumber === 1 &&
        <>
          <div className='border' style={{ height: '50%' }} onClick={(e) => onItemClick({lessonNumber: lessonNumber, weekday: weekday, group: group, weekNumber: 0})}></div>
          <div className='border' style={{ height: '50%' }}>
            <LessonContent item={items[0]} onItemClick={onItemClick}/>
          </div>
        </>
      }
      {items.length === 0 && <div onClick={(e) => onItemClick({lessonNumber: lessonNumber, weekday: weekday, group: group})}></div>}
    </div>
  );
}

export default memo(Lesson);