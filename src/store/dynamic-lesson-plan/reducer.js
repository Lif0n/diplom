export const initialState = {
  list: [],
  step: 7,
  startDate: new Date(),
  endDate: null,
  waiting: false
}


function reducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default reducer