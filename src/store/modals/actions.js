export default {
  /**
   * Открытие модалки по названию
   * @param name
   */
  open: (name, params) => {
    return {type: 'modal/open', payload: {name, params}};
  },

  /**
   * Закрытие модалки
   * @param name
   */
  close: (name) => {
    return {type: 'modal/close', payload: {name}}
  }
}
