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
      return { ...state, list: [], waiting: false }

    default:
      return state;
  }
}

export default reducer;