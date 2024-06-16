export default {

  load: () => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'schedules/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/Schedule`
        });

        dispatch({type: 'schedules/load-success', payload: {data: res.data}})
      } catch (e) {
        dispatch({type: 'schedules/load-error'})
      }
    }
  }
}