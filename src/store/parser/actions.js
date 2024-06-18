import ToBase64 from "../../utils/to-base64";

export default {

  load: (file, year, semester, status, department) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'parcer/load-start' });

      try {
        ToBase64(file)
          .then(async base64 => {
            const res = await services.api.request({
              url: `/api/Parser?year=${year}&semester=${semester}&statusId=${status}&department=${department}`,
              method: 'POST',
              body: JSON.stringify(base64)
            });
          })

        dispatch({ type: 'parcer/load-success', payload: { data: res.data } })
      } catch (e) {
        dispatch({ type: 'parcer/load-error' })
      }
    }
  }
}