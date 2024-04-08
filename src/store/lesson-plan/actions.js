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
        dispatch({type: 'groups/load-error'})
      }
    }
  }
}