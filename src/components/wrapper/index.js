import { memo } from 'react'
import './style.css'

function Wrapper({children}){

  return (
    <div className='Wrapper'>
      {children}
    </div>
  )
}

export default memo(Wrapper);