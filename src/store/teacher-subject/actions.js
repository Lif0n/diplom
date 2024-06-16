export default {

  load: (teacherId, subjectId) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'teacher-subjects/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/TeacherSubject?${teacherId ? `teacherId=`+teacherId : ''}${subjectId ? `&subjectId=`+subjectId : ''}`
        });

        dispatch({type: 'teacher-subjects/load-success', payload: {data: res.data}})
      } catch (e) {
        dispatch({type: 'teacher-subjects/load-error'})
      }
    }
  }
}