export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'lesson-plan/load-start':
      return { ...state, list: [], waiting: true };

    case 'lesson-plan/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'lesson-plan/load-error':
      return { ...state, list: [], waiting: false };

    case 'lesson-plan/delete-start':
      return { ...state, waiting: true };

    case 'lesson-plan/delete-success':
      return {
        ...state, list: state.list.filter(item => {
          if (item.id === action.payload.id) return false;
          return true;
        }), waiting: false
      };

    case 'lesson-plan/delete-error':
      return { ...state, waiting: false };

    case 'lesson-plan/post-start':
      return { ...state, waiting: true };

    case 'lesson-plan/post-success':
      return { ...state, list: [...state.list, action.payload.data], waiting: false }

    case 'lesson-plan/post-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;