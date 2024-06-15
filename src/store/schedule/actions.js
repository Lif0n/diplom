export default {

  load: () => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'subjects/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/Schedule`
        });

        dispatch({type: 'subjects/load-success', payload: {data: res.data}})
      } catch (e) {
        dispatch({type: 'subjects/load-error'})
      }
    }
  }
}