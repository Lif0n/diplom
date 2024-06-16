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

    default:
      return state;
  }
}

export default reducer;