export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'lesson-groups/load-start':
      console.log('start');
      return { ...state, list: [], waiting: true };

    case 'lesson-groups/load-success':
      console.log('suc');
      return { ...state, list: action.payload.data, waiting: false };

    case 'lesson-groups/load-error':
      return { ...state, list: [], waiting: false }

    case 'lesson-groups/delete-start':
      console.log('start');
      return { ...state, waiting: true };

    case 'lesson-groups/delete-success':
      console.log('suc');
      return { ...state, waiting: false };

    case 'lesson-groups/delete-error':
      return { ...state, waiting: false }

    default:
      return state;
  }
}

export default reducer;