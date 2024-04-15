import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'

function LessonPlanHead({ groups, teachers }) {
  const cn = bem('LessonPlanHead');

  return (
    <div className={'row flex-nowrap ' + cn()}>
      <div className={'col-1 ' + cn('space')}></div>
      {groups &&
        groups.map((group) => {
          return (<div key={group.id} className={cn('element')}>
            {<h6 className='text-center'>{group.speciality.shortname + '-' + group.name}</h6>}
          </div>)
        })
      }
      {teachers &&
        teachers.map((teacher) => {
          return (<div key={teacher.id} className={cn('element')}>
            {<h6 className='text-center'>{teacher.surname} {teacher.name}. {teacher.patronymic}.</h6>}
          </div>)
        })
      }
    </div>
  );
}

export default memo(LessonPlanHead);