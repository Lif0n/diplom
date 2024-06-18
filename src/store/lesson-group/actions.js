export default {

  load: (groupId, subjectId) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'lesson-groups/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/LessonGroup?${groupId ? `groupId=`+groupId : ''}${subjectId ? `&subjectId=`+subjectId : ''}`
        });
        console.log(res.data);
        dispatch({type: 'lesson-groups/load-success', payload: {data: res.data}})
      } catch (e) {
        console.log(e);
        dispatch({type: 'lesson-groups/load-error'})
      }
    }
  },
  delete: (id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'lesson-groups/delete-start'});

      try {
        const res = await services.api.request({
          url: `/api/LessonGroup?id=${id}`,
          method: 'DELETE'
        });
        dispatch({type: 'lesson-groups/delete-success', payload: {data: res.data}})
      } catch (e) {
        console.log(e);
        dispatch({type: 'lesson-groups/delete-error'})
      }
    }
  }
}