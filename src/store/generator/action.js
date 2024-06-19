export default {
  load: (year, semester, population, generations) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "generator/load-start" });

      try {
        const body = 
        {
            "year": year,
            "semestr": semester,
            "generations": generations,
            "population": population
        }
        console.log(body)
        const res = await services.api.request({
          url: `/api/Lesson/generated`,
          method: "POST",
          body: JSON.stringify(body),
        });
        dispatch({
          type: "generator/load-success",
          payload: { data: res.data },
        });
      } catch (e) {
        console.log(e)
        dispatch({ type: "generator/load-error" });
      }
    };
  },
};
