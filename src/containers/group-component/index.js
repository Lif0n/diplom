
import { Input, Button, Flex } from 'antd';
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalsActions from '../../store/modals/actions'
import lessonGroupActions from '../../store/lesson-group/actions'
//import groupTeachersActions from '../../store/group-teachers/actions';
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import subjectsActions from '../../store/subjects/actions'
import Wrapper from "../../components/wrapper";
import LessonSelect from '../../components/lesson-select';
import groupsActions from '../../store/groups/actions';


function GroupComponent({ group }) {
    const dispatch = useDispatch();

    const [groupCode, setGroupCode] = useState(group.groupCode);

    const [department, setDepartment] = useState(group.department);

    const deleteGroup = (bool) => {
        if (bool) {
            dispatch(groupsActions.delete(group.id));
        }
    }

    const putGroup = (bool) => {
        if (bool) {
            dispatch(groupsActions.put({ ...group, groupCode: groupCode, department: department }));
        }
    }

    const select = useSelector(state => ({
        //groupTeachers: state.groupTeachers.list,
        lessonGroups: state.lessonGroups.list,
        //groupTeachersWaiting: state.groupTeachers.waiting,
        groups: state.groups.list,
        teachersWaiting: state.teachers.waiting,
        subjects: state.subjects.list,
        subjecstWaiting: state.subjects.waiting,
    }))

    const groupTeachers = useMemo(() => {
        return
    })

    const callbacks = {
        onCancel: () => {
            setDepartment(group.department);
            setGroupCode(group.groupCode);
        },
        onAccept: () => {
            if (select.groups.find(group => {
                return group.groupCode.toLowerCase() == groupCode.toLowerCase()
            })) {
                toast.error('Такая группа уже есть');
                return;
            }
            if (groupCode.trim() == '' || department == null) {
                toast.error('Все поля должны быть заполненны');
                return;
            }
            if (!/[а-яА-Я]{2,5}-\d{2}[а-яА-Я]?$/.test(groupCode)) {
                toast.error('Проверьте правильность заполнения кода группы');
                return;
            }
            dispatch(modalsActions.open('confirm', {
                title: 'Внимание',
                text: 'Вы уверены, что хотите обновить данные группы?',
                onOk: putGroup
            }))
        },
        onDelete: () => {
            dispatch(modalsActions.open('confirm', {
                title: 'Внимание',
                text: 'Вы уверены, что хотите удалить группу?',
                onOk: deleteGroup
            }))
        }
    }



    return (
        <Wrapper>
            <Flex vertical gap='middle'>
                <Input value={groupCode} size='large' addonBefore='Код группы' onChange={(e) => setGroupCode(e.target.value)} />
                <LessonSelect placeholder='Отделение'
                    defaultValue={department}
                    onChange={(value) => setDepartment(value)}
                    selectOptions={[{ value: 1, label: 'Первое' }, { value: 2, label: 'Второе' }]} />
                <Flex gap='middle' justify='center' style={(groupCode == group.groupCode && department == group.department) ? { display: 'none' } : {}}>
                    <Button type='primary' onClick={callbacks.onAccept}>Сохранить изменения</Button>
                    <Button type='primary' onClick={callbacks.onCancel}>Отменить изменения</Button>
                </Flex>

                <Button type='primary' onClick={callbacks.onDelete}>Удалить группу</Button>
            </Flex>
        </Wrapper>
    );
}

export default memo(GroupComponent);