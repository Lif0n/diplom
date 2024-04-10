export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'teachers/load-start':
      return { ...state, list: [], waiting: true };

    case 'teachers/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'teachers/load-error':
      return { ...state, list: [], waiting: false }

    default:
      return state;
  }
}

export default reducer;