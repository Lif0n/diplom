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
      return { ...state, list: [], waiting: false };

    case 'groups/post-start':
      return { ...state, waiting: true };
    case 'groups/post-success':
      return { ...state, list: [...state.list, action.payload.data], waiting: false };

    case 'groups/post-error':
      return { ...state, waiting: false };

    case 'groups/delete-start':
      return { ...state, waiting: true };
    case 'groups/delete-success':
      return { ...state, list: state.list.filter(s => s.id != action.payload.data), waiting: false };

    case 'groups/delete-error':
      return { ...state, waiting: false };

    case 'groups/put-start':
      return { ...state, waiting: true };
    case 'groups/put-success':
      return { ...state, list: [...state.list, action.payload.data], waiting: false };

    case 'groups/put-error':
      return { ...state, waiting: false };
    default:
      return state;
  }
}

export default reducer;