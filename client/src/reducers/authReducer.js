export default (
  state = {
    isSignedIn: localStorage.getItem('id') ? true : false,
    userId: localStorage.getItem('id') ? localStorage.getItem('id') : null
  },
  action
) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return { ...state, isSignedIn: false, userId: null };
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, userId: action.payload };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};