import { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css'
import { Button, Card, Flex } from 'antd';

function TeacherSubjectComponent(props){
  return(
    <Card size='small'>
      <Flex gap='small' justify='space-between'>
        <h6>{props.subject.name}</h6>
        <Button onClick={props.onDelete} type='primary' danger>Удалить</Button>
      </Flex>
    </Card>
  );

}

export default memo(TeacherSubjectComponent);