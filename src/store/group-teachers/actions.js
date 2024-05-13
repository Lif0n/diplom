export default {

  load: ({groupId, teacherId}) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'group-teachers/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/GroupTeacher?${groupId ? `groupId=${groupId}` : ''}${teacherId ? `&teacherId=${teacherId}` : ''}`
        });
        dispatch({type: 'group-teachers/load-success', payload: {data: res.data}})
      } catch (e) {
        dispatch({type: 'group-teachers/load-error'})
      }
    }
  },
  delete: (id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'group-teachers/delete-start'});

      try {
        const res = await services.api.request({
          url: `/api/GroupTeacher?id=${id}`,
          method: 'DELETE'
        });
        dispatch({type: 'group-teachers/delete-success', payload: {data: getState.list.filter(gt => gt.id !== id)}})
      } catch (e) {
        dispatch({type: 'group-teachers/delete-error'})
      }
    }
  }
}