export const initialState = {
  selected: null,
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'schedules/load-start':
      return { ...state, list: [], waiting: true };

    case 'schedules/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'schedules/load-error':
      return { ...state, list: [], waiting: false }

    case 'schedules/set-start':
      return { ...state, waiting: true };

    case 'schedules/set-success':
      return { ...state, selected: action.payload.data, waiting: false };

    case 'schedules/set-error':
      return { ...state, waiting: false }

    case 'schedules/publishing-start':
      return { ...state, waiting: false };
    case 'schedules/publishing-success':
      return { ...state, waiting: false };
    case 'schedules/publishing-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;