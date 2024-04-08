import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'

function Weekday({ id }) {
  const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];

  const cn = bem('Weekday');

  return (
    <div className={'col-1 ' + cn('container')}>
      <h6 className={'m-0 ' + cn('text')}>{weekdays[id-1]}</h6>
    </div>
  );
}

export default memo(Weekday)