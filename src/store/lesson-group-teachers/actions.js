export default {

  load: ({ groupId, subjectId, teacherId }) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-group-teachers/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/LessonGroupTeacher?${groupId ? `groupId=` + groupId : ''}${subjectId ? `&subjectId=` + subjectId : ''}${teacherId ? '&teacherId=' + teacherId : ''}`
        });
        console.log(res.data);
        dispatch({ type: 'lesson-group-teachers/load-success', payload: { data: res.data } })
      } catch (e) {
        console.log(e);
        dispatch({ type: 'lesson-group-teachers/load-error' })
      }
    }
  },
  delete: (id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'lesson-group-teachers/delete-start'});

      try {
        const res = await services.api.request({
          url: `/api/LessonGroup?id=${id}`,
          method: 'DELETE'
        });
        dispatch({type: 'lesson-group-teachers/delete-success', payload: id})
      } catch (e) {
        console.log(e);
        dispatch({type: 'lesson-group-teachers/delete-error'})
      }
    }
  }
}