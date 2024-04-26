import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import { Input } from 'antd';
import './style.css'

function Wrapper({children}){

  return (
    <div className='Wrapper'>
      {children}
    </div>
  )
}

export default memo(Wrapper);