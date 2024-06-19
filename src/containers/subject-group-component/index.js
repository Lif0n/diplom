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
      dispatch(lessonGroupTeachersActions.delete(props.lgt.id))
    }
  }

  const callbacks = {
    onDelete: () => {
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы уверены, что хотите удалить данную группу у преподавателя, при этом он так же будет удален из пар у данного предмета и данной группы?',
        onOk: deleteS
      }))
    }
  }

  return(
    <Card size='small'>
      <Flex gap='small' justify='space-between'>
        <h6>{props.lgt.lessonGroup.group.groupCode}</h6>
        <Button onClick={callbacks.onDelete} type='primary' danger>Удалить</Button>
      </Flex>
    </Card>
  );
}

export default memo(SubjectGroupComponent)