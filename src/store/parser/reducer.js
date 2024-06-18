export const initialState = {
  result: false,
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'parcer/load-start':
      return { ...state, result: false, waiting: true };

    case 'parcer/load-success':
      return { ...state, result: true, waiting: false };

    case 'parcer/load-error':
      return { ...state, result: false, waiting: false }

    default:
      return state;
  }
}

export default reducer;