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
          url: `/api/Teacher?query=${query}`
        });
        dispatch({ type: 'teachers/search-success', payload: { data: res.data, query: query } })
      } catch (e) {
        dispatch({ type: 'teachers/search-error' })
      }
    }
  },
  put: (teacher) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'teachers/put-start' });
      try {
        const res = await services.api.request({
          url: `/api/Teacher`,
          method: 'PUT',
          body: JSON.stringify(teacher)
        });

        dispatch({ type: 'teachers/put-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'teachers/put-error' })
      }
    }
  },
  post: (teacher) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'teachers/post-start' });
      try {
        const res = await services.api.request({
          url: `/api/Teacher`,
          method: 'POST',
          body: JSON.stringify(teacher)
        });

        dispatch({ type: 'teachers/post-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'teachers/post-error' })
      }
    }
  },
  delete: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'teachers/delete-start' });
      try {
        const res = await services.api.request({
          url: `/api/Teacher/${id}`,
          method: 'DELETE'
        });

        dispatch({ type: 'teachers/delete-success', payload: { data: id } })
      } catch (e) {
        dispatch({ type: 'teachers/delete-error' })
      }
    }
  }

}