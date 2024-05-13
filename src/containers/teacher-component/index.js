import { memo, useCallback, useMemo, useState } from 'react';
import useInit from '../../hooks/use-init';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Card, Button, Tabs, Flex } from 'antd';
import groupTeachersActions from '../../store/group-teachers/actions';
import teachersActions from '../../store/teachers/actions';
import subjectsActions from '../../store/subjects/actions'
import Wrapper from '../../components/wrapper';
import uniqueValues from '../../utils/unique-values';
import modalsActions from '../../store/modals/actions';
import './style.css'
import TeacherSubjectComponent from '../teacher-subject-component';
import LessonSelect from '../../components/lesson-select';

function TeacherComponent({ teacher }) {

  const dispatch = useDispatch();

  const [surname, setSurname] = useState(teacher.surname);

  const [name, setName] = useState(teacher.name);

  const [patronymic, setPatronymic] = useState(teacher.patronymic);

  const [activeTab, setActiveTab] = useState(0);

  useInit(() => {
    dispatch(groupTeachersActions.load({ teacherId: teacher.id }));
    dispatch(subjectsActions.load());
  }, [teacher])

  const select = useSelector(state => ({
    query: state.teachers.query,
    groupTeachers: state.groupTeachers.list,
    subjects: state.subjects.list,
    waitingGroupTeachers: state.groupTeachers.waiting,
    waitingSubjects: state.subjects.waiting,
  }))

  const putTeacher = (bool) => {
    if (bool) {
      dispatch(teachersActions.put({ ...teacher, surname: surname, name: name, patronymic: patronymic }));
      if (select.query) {
        dispatch(teachersActions.search(select.query));
      } else {
        dispatch(teachersActions.load());
      }
    }
  }

  const groupTeachers = useMemo(() => {
    return select.groupTeachers.filter((gt) => gt.teacher.id === teacher.id)
  }, [select.groupTeachers, select.waitingGroupTeachers])

  const groups = useMemo(() => {
    const groups = [];
    uniqueValues(groupTeachers, 'group').forEach(group => {
      groups.push({
        key: group.id,
        label: `${group.speciality.shortname}-${group.name}`
      });
    });
    if (groups.length > 0) {
      setActiveTab(groups[0].key)
    }
    return groups;
  }, [groupTeachers, select.groupTeachers])

  const callbacks = {
    onTabChange: (key) => {
      setActiveTab(key);
    },
    onCancelTeacherChange: () => {
      setSurname(teacher.surname);
      setPatronymic(teacher.patronymic);
      setName(teacher.name);
    },
    onAcceptTeacherChange: () => {
      dispatch(modalsActions.open('confirm', {
        title: 'Внимание',
        text: 'Вы уверены, что хотите обновить данные преподавателя?',
        onOk: putTeacher
      }))
    }
  }

  const contentList = useMemo(() => {
    const contentList = {};
    groups.forEach(group => {
      const subjs = groupTeachers.filter(groupTeacher => groupTeacher.group.id === group.key);
      contentList[group.key] = [];
      subjs.forEach(subj => {
        contentList[group.key] = [...contentList[group.key], <TeacherSubjectComponent groupTeacher={subj} />]
      });
      contentList[group.key] = [...contentList[group.key],
      <LessonSelect placeholder='Добавить предмет'
        defaultValue={null}
        selectOptions={select.subjects.map((subject) => {
          return {
            value: subject.id,
            label: subject.name
          }
        })} />]
    });
    return contentList;
  }, [groupTeachers, groups, select.subjects])

  return (
    <Wrapper>
      <Flex vertical gap='middle'>
        <Input value={surname} style={{ width: '80%' }} className='teacherSurname' size='large' addonBefore='Фамилия' onChange={(e) => setSurname(e.target.value)} />
        <Input value={name} style={{ width: '80%' }} className='teacherName' size='large' addonBefore='Имя' onChange={(e) => setName(e.target.value)} />
        <Input value={patronymic} style={{ width: '80%' }} className='teacherPatronymic' size='large' addonBefore='Отчество' onChange={(e) => setPatronymic(e.target.value)} />
        <Flex gap='middle' justify='center' style={(name == teacher.name && surname == teacher.surname && patronymic == teacher.patronymic) ? { display: 'none' } : { width: '80%' }}>
          <Button type='primary' onClick={callbacks.onAcceptTeacherChange}>Сохранить изменения</Button>
          <Button type='primary' onClick={callbacks.onCancelTeacherChange}>Отменить изменения</Button>
        </Flex>
        <Card key={teacher.id} title='Связи' style={{ width: '80%' }}
          extra={<Button>Добавить группу к преподавателю</Button>}
          loading={select.waiting}>
          <Tabs items={groups} onChange={callbacks.onTabChange} activeKey={activeTab} />
          <Flex vertical gap='middle'>
            {contentList[activeTab]}
          </Flex>
        </Card>
      </Flex>
    </Wrapper>
  );
}

export default memo(TeacherComponent);