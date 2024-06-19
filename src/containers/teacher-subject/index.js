import { Card, Flex, Tabs, Button } from "antd";
import useInit from '../../hooks/use-init';
import subjectsActions from '../../store/subjects/actions'
import modalsActions from '../../store/modals/actions'
//import groupTeachersActions from '../../store/group-teachers/actions';
import lessonGroupTeachersActions from '../../store/lesson-group-teachers/actions'
import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import uniqueValues from "../../utils/unique-values";
import SubjectGroupComponent from "../subject-group-component";
import LessonSelect from "../../components/lesson-select";


//карточка с группами и предметами преподавателя
function TeacherSubject({ teacher }) {

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  const [newSubjects, setNewSubjects] = useState([]);

  useInit(() => {
    dispatch(lessonGroupTeachersActions.load({ teacherId: teacher.id }));
  })

  const select = useSelector(state => ({
    groups: state.groups.list,
    subjects: state.subjects.list,
    lessonGroups: state.lessonGroups.list,
    lessonGroupTeachers: state.lessonGroupTeachers.list,
    waitingSubjects: state.subjects.waiting,
    lessonGroupTeachersWaiting: state.lessonGroupTeachers.waiting
  }))

  const lessonGroupTeachers = useMemo(() => {
    return select.lessonGroupTeachers.filter((lgt) => lgt.teacher.id == teacher.id)
  }, [select.lessonGroupTeachers, teacher.id])

  const subjects = useMemo(() => {
    var lessonGroups = [];
    lessonGroupTeachers.forEach(lgt => {
      lessonGroups = [...lessonGroups, lgt.lessonGroup]
    })
    return uniqueValues(lessonGroups, 'subject').map(s => {
      console.log(s);
      return {
        key: s.id,
        label: s.name
      }
    }).concat(newSubjects);
  }, [lessonGroupTeachers, newSubjects])

  // const putSubject = (bool, value) => {
  //   if (bool) {
  //     const group = select.groups.find(g => g.id == activeTab);
  //     dispatch(groupTeachersActions.post({ teacher: teacher, subject: value, group: group }));
  //     setNewGroups([]);
  //   }
  // }

  const putGroup = (bool, value) => {
    if (bool) {
      const group = select.groups.find(g => g.id == value)
      dispatch();
    }
  }

  const putSubject = (bool, value) => {
    console.log(bool);
    console.log(value)
    if (bool) {
      console.log(value);
      if (subjects.some((s) => s.key == value)) {
        toast.error('Такой предмет уже есть у преподавателя');
        return;
      }
      setNewSubjects([...newSubjects, {
        key: value,
        label: select.subjects.find(s => s.id == value).name
      }]);
      dispatch(modalsActions.close('list'));
    }
  }

  const callbacks = {
    onTabChange: useCallback((key) => {
      setActiveTab(key);
    }, [subjects, newSubjects]),
    // onAcceptAddSubject: (value) => {
    //   const newSubject = select.subjects.find(s => s.id == value);
    //   const group = select.groups.find(g => g.id == activeTab);
    //   dispatch(modalsActions.open('confirm', {
    //     title: 'Внимание',
    //     text: `Вы уверены, что хотите добавить ${newSubject.name}
    //      в группе ${group?.groupCode} к ${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`,
    //     value: newSubject,
    //     onOk: putSubject
    //   }))
    // },
    onAddSubject: () => {
      dispatch(modalsActions.open('list', {
        title: 'Добавление предмета к преподавателю',
        text: 'Выберите предмет',
        placeholder: 'Предметы',
        selectOptions: select.subjects.map((s) => {
          return {
            value: s.id,
            label: s.name
          }
        }),
        onChange: putSubject
      }))
    }
  }

  const contentList = useMemo(() => {
    if (subjects.length === 0) {
      return {};
    }
    const contentList = {};
    subjects.forEach(s => {
      contentList[s.key] = (lessonGroupTeachers.filter(l => l.lessonGroup.subject.id === s.key) || []).map(lgt => (
        <SubjectGroupComponent key={lgt.id} lgt={lgt} />
      ));
      contentList[s.key].push(
        <LessonSelect 
          key={`lesson-select-${s.key}`}
          placeholder={'Добавить группу'}
          defaultValue={null}
          selectOptions={select.groups.map(g => ({
            value: g.id,
            label: g.groupCode
          }))}
          onChange={(value) => putGroup(true, value)}
        />
      );
    });
    return contentList;
  }, [subjects, lessonGroupTeachers, select.groups]);

  return (
    <Card key={teacher.id} title='Связи' style={{ width: '80%' }}
      extra={<Button onClick={callbacks.onAddSubject}>Добавить предмет к преподавателю</Button>}
      loading={select.waiting}>
      <Tabs items={subjects} activeKey={activeTab} onChange={callbacks.onTabChange} />
      <Flex vertical gap='middle'>
        {contentList[activeTab] || null}
      </Flex>
    </Card>
  )
}

export default memo(TeacherSubject);