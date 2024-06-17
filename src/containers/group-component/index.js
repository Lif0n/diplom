import { Button, Card } from "antd";
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalsActions from '../../store/modals/actions'
import lessonGroupActions from '../../store/lesson-group/actions'
import groupTeachersActions from '../../store/group-teachers/actions';
import useInit from "../../hooks/use-init";
import teachersActions from '../../store/teachers/actions';
import subjectsActions from '../../store/subjects/actions'


function GroupComponent({ group }) {
    const dispatch = useDispatch();

    const [groupCode, setGroupCode] = useState(group.groupCode);

    const [department, setDepartment] = useState(group.department);
    useInit(() => {
        dispatch(lessonGroupActions.load(group.id, null))
        dispatch(groupTeachersActions.load({ groupId: group.id }));
        dispatch(teachersActions.load());
        dispatch(subjectsActions.load());
    })

    const select = useSelector(state => ({
        groupTeachers: state.groupTeachers.list,
        lessonGroups: state.lessonGroups.list,
        groupTeachersWaiting: state.groupTeachers.waiting,
        teachers: state.teachers.list,
        teachersWaiting: state.teachers.waiting,
        subjects: state.subjects.list,
        subjecstWaiting: state.subjects.waiting,
    }))

    const groupTeachers = useMemo(() => {
        return
    })

    // const groupTeachers = useMemo(() => {
    //     return select.groupTeachers.filter((gt) => gt.group.id === group.id)
    // }, [select.groupTeachers, select.groupTeachersWaiting])



    return (
        <Card key={group.id} title={`${group.groupCode}`}
            extra={<Button>Добавить преподавателя к группе</Button>}>
        </Card>
    );
}

export default memo(GroupComponent);