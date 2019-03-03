export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_COLOR_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};
