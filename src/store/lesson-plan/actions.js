import pdfDownload from "../../utils/pdfDownload";

export default {

  load: () => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/LessonPlan?formating=Standard`
        });

        dispatch({ type: 'lesson-plan/load-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/load-error' })
      }
    }
  },
  delete: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/delete-start' });

      try {
        const res = await services.api.request({
          url: `/api/LessonPlan?id=${id}`,
          method: 'DELETE'
        });
        dispatch({ type: 'lesson-plan/delete-success', payload: { id } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/delete-error' })
      }
    }
  },
  post: (lesson) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/post-start' });

      try {
        const res = await services.api.request({
          url: `/api/LessonPlan`,
          method: 'POST',
          body: JSON.stringify(lesson)
        });
        dispatch({ type: 'lesson-plan/post-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/post-error' })
      }
    }
  },
  put: (lesson) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/put-start' });

      try {
        const res = await services.api.request({
          url: `/api/LessonPlan`,
          method: 'PUT',
          body: JSON.stringify(lesson)
        });
        dispatch({ type: 'lesson-plan/put-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/put-error' })
      }
    }
  },
  getPDF: (groupId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/getPdf-start' });

      try {
        const res = await services.api.requestPlainText({
          url: `/api/LessonPlan/${groupId}`,
          method: 'GET'
        });
        pdfDownload(res.data);
        dispatch({ type: 'lesson-plan/getPdf-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/getPdf-error' })
      }
    }
  }
}