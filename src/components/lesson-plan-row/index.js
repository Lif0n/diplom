import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'
import Weekday from '../weekday';
import Lesson from '../lesson';
import LessonPlanColumn from '../lesson-plan-column';

function LessonPlanRow({ list, weekday, groups }) {
  const cn = bem('LessonPlanRow');
  // const lessons = [];

  // console.log(list);

  // for (let i = 1; i < 7; i++) {
  //   lessons.push(<Lesson items={list.filter(function (item) {
  //     return item.lessonNumber === i;
  //   })} />);
  // }

  const cols = [];

  groups.forEach((item) => {
    cols.push(<LessonPlanColumn list={list.filter(function (item){
      return item.group.id === item.id;
    })}/>);
  })


  return (
    <div className={'row flex-nowrap ' + cn()}>
      <Weekday id={weekday} />
        {cols}
    </div>
  );
}

export default memo(LessonPlanRow);