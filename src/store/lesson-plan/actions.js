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
  post: (lesson, teachers, scheduleId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/post-start' });

      console.log(lesson);
      console.log(teachers);
      try {
         const res = await services.api.request({
           url: `/api/Lesson?scheduleId=${scheduleId}`,
           method: 'POST',
           body: JSON.stringify({lesson, teachers})
         });
        dispatch({ type: 'lesson-plan/post-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/post-error' })
      }
    }
  },
  put: (lesson, teachers) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'lesson-plan/put-start' });

      console.log(lesson);
      console.log(teachers);
      console.log( JSON.stringify({lesson, teachers}))

      try {
         const res = await services.api.request({
           url: `/api/Lesson`,
           method: 'PUT',
           body: JSON.stringify({lesson, teachers})
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
          url: `/api/Lesson/Pdf/?${groupId ? 'groupId=' + groupId : ''}${teacherId ? 'teacherId=' + teacherId : ''}`,
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
        const queryParams = new URLSearchParams();
  
        if (newParams.teacher && newParams.teacher.length > 0) {
          newParams.teacher.forEach(id => queryParams.append('teacherId', id));
        }
        if (newParams.group && newParams.group.length > 0) {
          newParams.group.forEach(id => queryParams.append('groupId', id));
        }
        if (newParams.audience && newParams.audience.length > 0) {
          newParams.audience.forEach(id => queryParams.append('audienceId', id));
        }
        if (newParams.schedule) {
          queryParams.append('scheduleId', newParams.schedule);
        }
        if (newParams.department) {
          queryParams.append('department', newParams.department);
        }
  
        const res = await services.api.request({
          url: `/api/Lesson/Search?${queryParams.toString()}`
        });

        dispatch({ type: 'lesson-plan/setParams-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'lesson-plan/setParams-error' })
      }
    }
  }
}