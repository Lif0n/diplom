import base64ToPdf from '../../utils/base64-to-pdf';

export default {

  load: () => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/Lesson?formating=Standard`
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
          url: `/api/Lesson?id=${id}`,
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
          url: `/api/Lesson`,
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
          url: `/api/Lesson`,
          method: 'PUT',
          body: JSON.stringify(lesson)
        });
        dispatch({ type: 'lesson-plan/put-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/put-error' })
      }
    }
  },
  getPDF: ({ groupId, teacherId, name }) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/getPdf-start' });

      try {
        const res = await services.api.requestPlainText({
          url: `/api/Lesson/Pdf/?
          ${groupId ? 'groupId=' + groupId : ''}${teacherId ? 'teacherId=' + teacherId : ''}`,
          method: 'GET'
        });
        base64ToPdf(res.data, name);
        dispatch({ type: 'lesson-plan/getPdf-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/getPdf-error' })
      }
    }
  },
  setParams: (newParams) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/setParams-start' });

      try {
        const res = await services.api.request({
          url: `/api/Lesson/Search?
          ${newParams.teacher ? 'teacherId=' + newParams.teacher : ''}
          ${newParams.group ? '&groupId=' + newParams.group : ''}
          ${newParams.audience ? '&audienceId=' + newParams.audience : ''}
          ${newParams.schedule ? '&scheduleId=' + newParams.schedule : ''}
          ${newParams.department ? '&department=' + newParams.department : ''}`
        })

        dispatch({ type: 'lesson-plan/setParams-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/setParams-error' })
      }
    }
  }
}