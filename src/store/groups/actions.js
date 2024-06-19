export default {

  load: (query) => {
    return async(dispatch, getState, services) => {
     dispatch({type: 'groups/load-start'});
     
     try {
      const res = await services.api.request({
        url: `/api/Group${query ? `?query=`+query:''}`
      });

      dispatch({type: 'groups/load-success', payload: {data: res.data}})
     } catch (e) {
      dispatch({type: 'groups/load-error'})
     }
    }
  },
  post: (group) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'groups/post-start'});
      
      try {
       const res = await services.api.request({
         url: `/api/Group`,
         method: 'POST',
         body: JSON.stringify(group)
       });
 
       dispatch({type: 'groups/post-success', payload: {data: res.data}})
      } catch (e) {
       dispatch({type: 'groups/post-error'})
      }
     }
  }
}