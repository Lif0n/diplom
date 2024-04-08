import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'

function LessonPlanHead({ groups }) {
  const cn = bem('LessonPlanHead');

  return (
    <div className={'row flex-nowrap sticky '+cn()}>
      <div className={'col-1 '+cn('space')}></div>
      {groups.map((group) => {
        return (<div className={cn('element')}>
          <h6 className='text-center'>{group.speciality.shortname+'-'+group.name}</h6>
        </div>)
      })}
    </div>
  );
}

export default memo(LessonPlanHead);