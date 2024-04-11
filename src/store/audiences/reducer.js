export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'audiences/load-start':
      return { ...state, list: [], waiting: true };

    case 'audiences/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'audiences/load-error':
      return { ...state, list: [], waiting: false }

    default:
      return state;
  }
}

export default reducer;