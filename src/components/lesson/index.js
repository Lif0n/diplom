import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'

function Lesson({ items, onClick }) {

  const cn = bem('Lesson');

  // var content;

  // if (items.length > 1) {

  //   content =
  //     <>
  //       <div className='border h-50 w-100'>
  //         <h6>{items[0]?.subject?.name}</h6>
  //         <div className='row h-50'>
  //           <h6 className='col'>{items[0]?.audience?.number}</h6>
  //           <h6 className='col'>{items[0]?.teachers[0]?.surname} {items[0]?.teachers[0]?.name}.{items[0]?.teachers[0]?.patronimic}</h6>
  //         </div>
  //       </div>
  //       <div className='border h-50 w-100'>
  //         <h6>{items[1]?.subject?.name}</h6>
  //         <div className='row h-50'>
  //           <h6 className='col'>{items[1]?.audience?.number}</h6>
  //           <h6 className='col'>{items[1]?.teachers[1]?.surname} {items[1]?.teachers[1]?.name}.{items[1]?.teachers[1]?.patronimic}</h6>
  //         </div>
  //       </div>
  //     </>
  // }
  // else {
  //   content =
  //     <div>
  //       <h6 className='h-50'>{items[0]?.subject?.name}</h6>
  //       <div className='row h-50'>
  //         <h6 className='col'>{items[0]?.audience?.number}</h6>
  //         <h6 className='col'>{items[0]?.teachers[0]?.surname} {items[0]?.teachers[0]?.name}.{items[0]?.teachers[0]?.patronimic}</h6>
  //       </div>
  //     </div>
  // }

  return (
    <div className={'row border m-1 p-0 ' + cn()}>
      <h6 className='h-50'>{items[0]?.subject?.name}</h6>
      <div className='row h-50'>
        <h6 className='col'>{items[0]?.audience?.number}</h6>
        <h6 className='col'>{items[0]?.teachers[0]?.surname} {items[0]?.teachers[0]?.name}.{items[0]?.teachers[0]?.patronimic}</h6>
      </div>
    </div>
  );
}

export default memo(Lesson);