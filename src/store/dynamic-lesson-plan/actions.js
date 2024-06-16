export default {
  load: () => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'dynamic-lesson-plan/load-start' });
      try {
        

        dispatch({ type: 'dynamic-lesson-plan/load-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'dynamic-lesson-plan/load-error' })
      }
    }
  }
}