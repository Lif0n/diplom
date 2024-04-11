export default {

  load: () => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'audiences/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/Audience`
        });

        dispatch({type: 'audiences/load-success', payload: {data: res.data}})
      } catch (e) {
        dispatch({type: 'audiences/load-error'})
      }
    }
  }
}