export default {

  load: () => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'teachers/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/Teacher`
        });

        dispatch({type: 'teachers/load-success', payload: {data: res.data}})
      } catch (e) {
        dispatch({type: 'lesson-plan/load-error'})
      }
    }
  }
}