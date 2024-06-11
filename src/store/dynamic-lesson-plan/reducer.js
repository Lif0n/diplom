import DateToString from '../../utils/date-to-string'

export const initialState = {
  list: [],
  step: 7,
  startDate: DateToString(new Date()),
  endDate: DateToString(new Date(), 7),
  waiting: false
}


function reducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default reducer