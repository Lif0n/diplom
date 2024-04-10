import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'

function LessonContent({ item, onItemClick }) {

  const callbacks = {
    onClick: (e) => onItemClick(item),
  }

  return (
    <div className='LessonContent' onClick={callbacks.onClick}>
      <h6 className='h-50'>{item.subject?.name}</h6>
      <div className='row h-50'>
        {item.audience && <h6 className='col'>{item.audience?.number}</h6>}
        <h6 className='col'>{item?.teachers[0]?.surname} {item?.teachers[0]?.name}. {item?.teachers[0]?.patronymic}.</h6>
      </div>
    </div>
  );
}

export default memo(LessonContent);