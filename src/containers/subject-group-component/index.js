import { memo } from 'react'
import modalsActions from '../../store/modals/actions'
import lessonGroupsActions from '../../store/lesson-group/actions';
import { Button, Card, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import lessonGroupTeachersActions from '../../store/lesson-group-teachers/actions'

function SubjectGroupComponent(props) {

  const dispatch = useDispatch();

  const deleteS = (bool) => {
    if(bool){
      dispatch(lessonGroupTeachersActions.delete({teacherId: props.teacher.id, subjectId: props.subject.id }))
    }
  }

  const callbacks = {
    onDelete: () => {
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы уверены, что хотите удалить данную группу у преподавателя, при этом так же будут удалены пары, в которых преподаватель ведет этот предмет?',
        onOk: deleteS
      }))
    }
  }

  return(
    <Card size='small'>
      <Flex gap='small' justify='space-between'>
        <h6>{props.subject.name}</h6>
        <Button onClick={callbacks.onDelete} type='primary' danger>Удалить</Button>
      </Flex>
    </Card>
  );
}

export default memo(SubjectGroupComponent)