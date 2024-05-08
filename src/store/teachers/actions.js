export default {

  load: () => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'teachers/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/Teacher`
        });

        dispatch({ type: 'teachers/load-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/load-error' })
      }
    }
  },
  search: (query) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'teachers/search-start' });
      try {
        const res = await services.api.request({
          url: `api/Teacher&query=${query}`
        });
        dispatch({type: 'teachers/search-success'})
      } catch (e) {
        dispatch({type: 'teachers/search-error'})
      }
    }
  }
}