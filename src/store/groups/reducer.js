export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'groups/load-start':
      return { ...state, list: [], waiting: true };
    case 'groups/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'groups/load-error':
      return {...state, list: [], waiting: false};

    default:
      return state;
  }
}

export default reducer;