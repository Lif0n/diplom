import { memo, useMemo } from 'react';
import './style.css'
import { Tooltip } from 'antd';

function LessonContent({ item, onItemClick }) {

  const callbacks = {
    onClick: (e) => onItemClick(item),
  }

  const error = () => {
    let errors = '';
    if (item.errors) {
      item.errors.forEach(error => {
        errors += `\n${error}`;
      });
    }
    return errors;
  }

  if(item.id == 602 || item.id == 51 || item.id == 249 ){
    console.log(item);
  }

  return (
    <Tooltip title={item.errors? error : ''} color='orange'>
      <div className='LessonContent' onClick={callbacks.onClick}>
        <h6 className='h-50'>{item.subject?.name}</h6>
        <div className='row h-50'>
          {item.audience && <h6 className='col m-0'>{item.audience?.number}</h6>}
          <h6 className='col m-0'>{item?.teachers[0]?.surname} {item?.teachers[0]?.name}. {item?.teachers[0]?.patronymic}.</h6>
        </div>
      </div>
    </Tooltip>
  );
}

export default memo(LessonContent);