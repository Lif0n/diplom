import FetchGroupTeachers from "../../utils/fetch-group-teachers";

export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'group-teachers/load-start':
      return { ...state, waiting: true };

    case 'group-teachers/load-success':
      return { ...state, list: FetchGroupTeachers(state.list, action.payload.data), waiting: false };

    case 'group-teachers/load-error':
      return { ...state, waiting: false };

    case 'group-teachers/delete-start':
      return { ...state, waiting: true };

    case 'group-teachers/delete-success':
      return { ...state, list: state.list.filter(gt => gt.id !== action.payload.data), waiting: false };

    case 'group-teachers/delete-error':
      return { ...state, waiting: false };

    case 'group-teachers/post-start':
      return { ...state, waiting: true };

    case 'group-teachers/post-success':
      return { ...state, list: [...state.list, action.payload.data], waiting: false };

    case 'group-teachers/post-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;