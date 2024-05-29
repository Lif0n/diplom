export const initialState = {
  list: [],
  waiting: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'teachers/load-start':
      return { ...state, list: [], waiting: true };

    case 'teachers/load-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'teachers/load-error':
      return { ...state, list: [], waiting: false };

    case 'teachers/search-start':
      return { ...state, list: [], waiting: true };

    case 'teachers/search-success':
      return { ...state, list: action.payload.data, waiting: false };

    case 'teachers/search-error':
      return { ...state, waiting: false };

    case 'teachers/put-start':
      return { ...state, waiting: true };

    case 'teachers/put-success':
      return { ...state, list: state.list.map(teacher => {
        if(teacher.id == action.payload.data.id){
          return action.payload.data
        };
        return teacher;
      }), waiting: false };

    case 'teachers/put-error':
      return { ...state, waiting: false };

    case 'teachers/post-start':
      return { ...state, waiting: true };

    case 'teachers/post-success':
      return { ...state, list: [...state.list, action.payload.data], waiting: false };

    case 'teachers/post-error':
      return { ...state, waiting: false };

    case 'teachers/delete-start':
      return { ...state, waiting: true };

    case 'teachers/delete-success':
      return { ...state, list: state.list.filter(teacher => 
        teacher.id != action.payload.data
      ), waiting: false };

    case 'teachers/delete-error':
      return { ...state, waiting: false };
    default:
      return state;
  }
}

export default reducer;