import { memo, useMemo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'
import Weekday from '../weekday';
import Lesson from '../lesson';
import LessonPlanColumn from '../lesson-plan-column';

function LessonPlanRow({ list, weekday, groups, onItemClick }) {
  const cn = bem('LessonPlanRow');

  const cols = useMemo(() => {
    const cols = [];
    groups.forEach((group) => {
      cols.push(<LessonPlanColumn key={group.id} onItemClick={onItemClick} weekday={weekday} group={group} list={list.filter(function (item) {
        if (group.patronymic) {
          return item.teachers.find((teacher) => {
            return teacher.id === group.id;
          })
        } else {
          return item.group.id === group.id;
        }
      })} />);
    });
    return cols;
  }, [list])

  return (
    <div className={'row flex-nowrap ' + cn()}>
      <Weekday id={weekday} />
      {cols}
    </div>
  );
}

export default memo(LessonPlanRow);