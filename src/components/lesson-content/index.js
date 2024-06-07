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
        errors += `${error}\r\n`;
      });
    }
    return errors;
  }

  return (
    <Tooltip title={item.errors ? error : ''} color='orange'>
      <div className={'LessonContent'+(item.isDistantce ? ' distance' : '')} onClick={callbacks.onClick}>
        <div className='row h-33'>
          <h6 className='col-md-auto m-0'>{item.subject?.name}</h6>
          {item.audience && <h6 className='col m-0'>{item.audience?.number}</h6>}
        </div>
        <div className='row h-33'>
          <h6 className='col m-0'>{item?.teachers[0]?.surname} {item?.teachers[0]?.name[0]}. {item?.teachers[0]?.patronymic[0]}.</h6>
          {item.teachers[1] && <h6 className='col m-0 second'>{item?.teachers[1]?.surname} {item?.teachers[1]?.name[0]}. {item?.teachers[1]?.patronymic[0]}.</h6>}
        </div>
      </div>
    </Tooltip>
  );
}

export default memo(LessonContent);