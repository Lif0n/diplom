export const initialState = {
  list: [],
  waiting: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'teachers/load-start':
      return { ...state, list: [], waiting: true };

    case 'teachers/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'teachers/load-error':
      return { ...state, list: [], waiting: false };

    case 'teachers/search-start':
      return { ...state, list: [], waiting: true };

    case 'teachers/search-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'teachers/search-error':
      return { ...state, waiting: false };

    case 'teachers/put-start':
      return { ...state, waiting: true };

    case 'teachers/put-success':
      return { ...state, waiting: false };

    case 'teachers/put-error':
      return { ...state, waiting: false };
    default:
      return state;
  }
}

export default reducer;