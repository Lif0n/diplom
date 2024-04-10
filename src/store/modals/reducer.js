// // Начальное состояние
// const initialState = {
//   name: ''
// }

// // Обработчик действий
// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case 'modal/open':
//       return {...state, name: action.payload.name};
//     case 'modal/close':
//       return {...state, name: null};
//     default:
//       return state;
//   }
// }

// export default reducer;
// Начальное состояние
const initialState = {
  list: [],
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'modal/open':
      return {...state, list: [...state.list, {name: action.payload.name, params: action.payload.params}]};
    case 'modal/close':
      return {...state, list: state.list.filter((item) => {
        return item.name !== action.payload.name
      })};
    default:
      return state;
  }
}

export default reducer;