export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'teacher-subjects/load-start':
      return { ...state, list: [], waiting: true };

    case 'teacher-subjects/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'teacher-subjects/load-error':
      return { ...state, list: [], waiting: false }

    default:
      return state;
  }
}

export default reducer;