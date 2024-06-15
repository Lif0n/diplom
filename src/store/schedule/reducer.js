export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'schedules/load-start':
      return { ...state, list: [], waiting: true };

    case 'schedules/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'schedules/load-error':
      return { ...state, list: [], waiting: false }

    default:
      return state;
  }
}

export default reducer;