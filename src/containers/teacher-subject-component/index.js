import { memo } from 'react'
import modalsActions from '../../store/modals/actions'
//import groupTeachersActions from '../../store/group-teachers/actions'
import './style.css'
import { Button, Card, Flex } from 'antd';
import { useDispatch } from 'react-redux';

function TeacherSubjectComponent(props){

  const dispatch = useDispatch();

  // const deleteGt = (bool) => {
  //   if(bool){
  //     dispatch(groupTeachersActions.delete(props.groupTeacher.id))
  //   }
  // }

  const callbacks = {
    onDelete: () => {
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы уверены, что хотите удалить данный предмет у преподавателя?',
        onOk: deleteGt
      }))
    }
  }

  return(
    <Card size='small'>
      <Flex gap='small' justify='space-between'>
        {/* <h6>{props.groupTeacher.subject.name}</h6> */}
        <Button onClick={callbacks.onDelete} type='primary' danger>Удалить</Button>
      </Flex>
    </Card>
  );

}

export default memo(TeacherSubjectComponent);