import { Button, Flex } from "antd";
import { memo } from "react";
import LessonSelect from "../../components/lesson-select";
import { useDispatch, useSelector } from "react-redux";

function LessonPlanFilters() {

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    groups: state.groups.list,
    teachers: state.teachers.list,
    audiences: state.audiences.list,
    teachersWaitnig: state.teachers.waiting,
    groupsWaiting: state.groups.waiting,
    audiencesWaiting: state.audiences.waiting
  }))

  return (
    <Flex style={{position: 'fixed', width: '100vw', top: '76px'}} gap={'large'} justify="center">
      <LessonSelect
        showSearch
        placeholder={'Группа'}
        defaultValue={null}
        selectOptions={select.groups.map((group) => {
          return {
            value: group.id,
            label: `${group.speciality.shortname}-${group.name}`
          }
        })}
        loading={select.groupsWaiting} />
      <LessonSelect
        showSearch
        placeholder={'Преподаватель'}
        defaultValue={null}
        selectOptions={select.teachers.map((teacher) => {
          return {
            value: teacher.id,
            label: `${teacher.surname} ${teacher.name}.${teacher.patronymic}`
          }
        })}
        loading={select.teachersWaitnig} />
      <LessonSelect
        showSearch
        placeholder={'Кабинет'}
        defaultValue={null} 
        selectOptions={select.audiences.map((audience) => {
          return {
            value: audience.id,
            label: audience.number
          }
        })}
        loading={select.audiencesWaiting}/>
        <Button type="primary" style={{margin: '15px 0px'}}>Сбросить фильтры</Button>
    </Flex>
  );
}

export default memo(LessonPlanFilters);