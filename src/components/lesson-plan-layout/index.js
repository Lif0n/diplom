import './style.css';
import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';

function LessonPlanLayout({children}) {

  const cn = bem('LessonPlanLayout');

  return(
    <div className={cn()+' container-fluid'}>
      {children}
    </div>
  );
}

export default memo(LessonPlanLayout);
