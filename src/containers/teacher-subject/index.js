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


//карточка с группами и предметами преподавателя
function TeacherSubject({ teacher }) {

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  const [newSubjects, setNewSubjects] = useState([]);

  useInit(() => {
    dispatch(lessonGroupTeachersActions.load({ teacherId: teacher.id }));
  })

  const select = useSelector(state => ({
    subjects: state.subjects.list,
    lessonGroups: state.lessonGroups.list,
    lessonGroupTeachers: state.lessonGroupTeachers.list,
    waitingSubjects: state.subjects.waiting,
    lessonGroupTeachersWaiting: state.lessonGroupTeachers.waiting
  }))

  const lessonGroupTeachers = useMemo(() => {
    return select.lessonGroupTeachers.filter((lgt) => lgt.teacher.id == teacher.id)
  }, [select.lessonGroupTeachers])

  const subjects = useMemo(() => {
    var lessonGroups = [];
    lessonGroupTeachers.forEach(lgt => {
      lessonGroups = [...lessonGroups, lgt.lessonGroup]
    })
    return uniqueValues(lessonGroups, 'subject').map(s => ({
      key: s.id,
      label: s.name
    })).concat(newSubjects);
  })

  // const putSubject = (bool, value) => {
  //   if (bool) {
  //     const group = select.groups.find(g => g.id == activeTab);
  //     dispatch(groupTeachersActions.post({ teacher: teacher, subject: value, group: group }));
  //     setNewGroups([]);
  //   }
  // }

  const putSubject = (bool, value) => {
    if (bool) {
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
    // onTabChange: useCallback((key) => {
    //   setActiveTab(key);
    // }, [groups, newGroups]),
    onAcceptAddSubject: (value) => {
      const newSubject = select.subjects.find(s => s.id == value);
      const group = select.groups.find(g => g.id == activeTab);
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: `Вы уверены, что хотите добавить ${newSubject.name}
         в группе ${group?.groupCode} к ${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`,
        value: newSubject,
        onOk: putSubject
      }))
    },
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
    const contentList = {};
    var lessonGroups = [];
    subjects.forEach(s => {
      lessonGroupTeachers.forEach(lgt => {
        lessonGroups = [...lessonGroups, lgt.lessonGroup]
      });
      const groups = uniqueValues(lessonGroups.filter(lg => lg.subject.id = s.key), 'subject')
    })
    contentList[s.key] = [...contentList[s.key], <SubjectGroupComponent teacher={teacher} subject/>]
  })

  // const contentList = useMemo(() => {
  //   const contentList = {};
  //   groups.forEach(group => {
  //     const subjs = groupTeachers.filter(groupTeacher => groupTeacher.group.id === group.key);
  //     contentList[group.key] = [];
  //     subjs.forEach(subj => {
  //       contentList[group.key] = [...contentList[group.key], <TeacherSubjectComponent groupTeacher={subj} />]
  //     });
  //     contentList[group.key] = [...contentList[group.key],
  //     <LessonSelect placeholder='Добавить предмет'
  //       defaultValue={null}
  //       selectOptions={select.subjects.map((subject) => {
  //         return {
  //           value: subject.id,
  //           label: subject.name
  //         }
  //       })}
  //       onChange={(value) => {
  //         callbacks.onAcceptAddSubject(value);
  //       }} />]
  //   });
  //   return contentList;
  // }, [groupTeachers, groups, select.subjects])

  return (
    <Card key={teacher.id} title='Связи' style={{ width: '80%' }}
      extra={<Button onClick={callbacks.onAddSubject}>Добавить предмет к преподавателю</Button>}
      loading={select.waiting}>
      <Tabs items={subjects} activeKey={activeTab}/>
      {/* <Flex vertical gap='middle'>
        {contentList[activeTab]}
      </Flex> */}
    </Card>
  )
}

export default memo(TeacherSubject);