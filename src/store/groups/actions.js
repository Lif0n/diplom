export default {

  load: () => {
    return async(dispatch, getState, services) => {
     dispatch({type: 'groups/load-start'});
     
     try {
      const res = await services.api.request({
        url: `/api/Group`
      });

      dispatch({type: 'groups/load-success', payload: {data: res.data}})
     } catch (e) {
      dispatch({type: 'groups/load-error'})
     }
    }
  },
}