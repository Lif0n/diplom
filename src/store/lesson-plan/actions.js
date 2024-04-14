export default {

  load: () => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'lesson-plan/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/LessonPlan?formating=Standard`
        });

        dispatch({type: 'lesson-plan/load-success', payload: {data: res.data}})
      } catch (e) {
        dispatch({type: 'lesson-plan/load-error'})
      }
    }
  },
  delete: (id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'lesson-plan/delete-start'});

      try {
        const res = await services.api.request({
          url: `/api/LessonPlan?id=${id}`,
          method: 'DELETE'
        });
        dispatch({type: 'lesson-plan/delete-success', payload: {id}})
      } catch (e) {
        dispatch({type: 'lesson-plan/delete-error'})
      }
    }
  }
}