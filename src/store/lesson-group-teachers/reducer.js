import FetchGroupTeachers from "../../utils/fetch-group-teachers";

export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'lesson-group-teachers/load-start':
      console.log('start');
      return { ...state, waiting: true };

    case 'lesson-group-teachers/load-success': {
      let newArr = [...state.list];
      action.payload.data.forEach((lgt) => {
        if (!state.list.some((l => { lgt.id == l.id }))) {
          newArr = [...newArr, lgt];
        }
      })
      console.log(newArr)
      return { ...state, list: newArr, waiting: false };
    }
    case 'lesson-group-teachers/load-error':
      return { ...state, list: [], waiting: false }

    case 'lesson-group-teachers/delete-start':
      console.log('start');
      return { ...state, waiting: true };

    case 'lesson-group-teachers/delete-success':
      return { ...state, list : state.list.filter(lgt => lgt.id != action.payload), waiting: false };

    case 'lesson-group-teachers/delete-error':
      return { ...state, waiting: false }

    default:
      return state;
  }
}

export default reducer;