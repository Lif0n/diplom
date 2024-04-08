import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'
import Weekday from '../weekday';
import Lesson from '../lesson';

function LessonPlanRow({list, weekday}) {
  const cn = bem('LessonPlanRow');
  const lessons = [];
  
  for(let i = 1; i < 7; i++){
    lessons.push(<Lesson items={list.filter(function(weekday) {
      return weekday === i;
    })}/>);
  }

  return(
    <div className={'row flex-nowrap '+cn()}>
      <Weekday id={weekday}/>
      {lessons}
    </div>
  );
}

export default memo(LessonPlanRow);