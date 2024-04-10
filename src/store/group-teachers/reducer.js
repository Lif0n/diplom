export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'group-teachers/load-start':
      return { ...state, list: [], waiting: true };

    case 'group-teachers/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'group-teachers/load-error':
      return { ...state, list: [], waiting: false }

    default:
      return state;
  }
}

export default reducer;