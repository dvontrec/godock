import api from '../apis/colors';

import history from '../history';

// ***************************************************************
//                  COLORS
// ***************************************************************
export const fetchColors = () => async dispatch => {
  const response = await api.get('/api/colors');
  dispatch({ type: 'FETCH_COLORS', payload: response.data });
};

export const fetchColor = color => async dispatch => {
  const response = await api.get(`/api/colors?color=${color}`);
  dispatch({ type: 'FETCH_COLOR', payload: response.data });
};

export const createColor = colorQuery => async dispatch => {
  const response = await api.post(`api/colors?${colorQuery}`);
  //  dispatches an action with the response as the payload
  dispatch({ type: 'CREATE_COLOR', payload: response.data });
  //  Do programmatic navigation to get user back to root route
  history.push('/');
};

export const editColor = colorQuery => async dispatch => {
  const response = await api.patch(`api/colors?${colorQuery}`);
  dispatch({ type: 'EDIT_COLOR', payload: response.data });
  alert('Color Updated');
  window.location.reload();
  history.push('/');
};

// ***************************************************************
//                  AUTH
// ***************************************************************
export const registerUser = userQuery => async dispatch => {
  const response = await api.post(`api/${userQuery}`);
  dispatch({ type: 'REGISTER_USER', payload: response.data });
  history.push('/');
};

export const signIn = userQuery => async dispatch => {
  const response = await api.get(`api/${userQuery}`);
  dispatch({ type: 'SIGN_IN', payload: response.data });
  localStorage.setItem('id', response.data.id);
  localStorage.setItem('hash', response.data.hash);
  history.push('/');
};

export const signOut = () => {
  localStorage.removeItem('id');
  localStorage.removeItem('hash');
  return {
    type: 'SIGN_OUT'
  };
};

// ***************************************************************
//                  COLOR FAVORITES
// ***************************************************************
// Posts to the api to create a new favorite link between the user and the color
export const addFavorites = favoritesQuery => async dispatch => {
  const response = await api.post(`api/colorfavorites?${favoritesQuery}`);
  dispatch({ type: 'ADD_FAVORITES', payload: response.data });
};
export const removeFavorites = favoritesQuery => async dispatch => {
  const response = await api.delete(`api/colorfavorites?${favoritesQuery}`);
  dispatch({ type: 'DELETE_FAVORITES', payload: response.data });
};

// Calls the api to get a list of colors favorited by the given user
export const getFavoritesByUser = userId => async dispatch => {
  const response = await api.get(`api/colorfavorites?userId=${userId}`);
  dispatch({ type: 'GET_USER_FAVORITES', payload: response.data });
};

// Calls the api to get a list of users who have favorited the given color
export const getFavoritesByColor = colorHex => async dispatch => {
  const response = await api.get(`api/colorfavorites?colorHex=${colorHex}`);
  dispatch({ type: 'GET_COLOR_FAVORITES', payload: response.data });
};

// ***************************************************************
//                  Palettes
// ***************************************************************

export const createPalette = paletteData => async dispatch => {
  const response = await api.post(`api/palettes?${paletteData}`);
  dispatch({ type: 'CREATE_PALETTE', payload: response.data });
  alert('Palette Created');
  history.push('/');
};

export const getPalette = paletteID => async dispatch => {
  const response = await api.get(`api/palettes?paletteID=${paletteID}`);
  dispatch({ type: 'GET_PALETTE', payload: response.data });
};

// ***************************************************************
//                  Palette FAVORITES
// ***************************************************************
// Posts to the api to create a new favorite link between the user and the palette
export const addPaletteFavorites = favoritesQuery => async dispatch => {
  const response = await api.post(`api/palettefavorites?${favoritesQuery}`);
  dispatch({ type: 'ADD_PALETTE_FAVORITES', payload: response.data });
};
export const removePaletteFavorites = favoritesQuery => async dispatch => {
  const response = await api.delete(`api/palettefavorites?${favoritesQuery}`);
  dispatch({ type: 'DELETE_PALETTE_FAVORITES', payload: response.data });
};

// Calls the api to get a list of palettes favorited by the given user
export const getPaletteFavoritesByUser = userId => async dispatch => {
  const response = await api.get(`api/palettefavorites?userId=${userId}`);
  dispatch({ type: 'GET_USER_PALETTE_FAVORITES', payload: response.data });
};

// Calls the api to get a list of users who have favorited the given palette
export const getFavoritesByPalette = colorHex => async dispatch => {
  const response = await api.get(`api/palettefavorites?colorHex=${colorHex}`);
  dispatch({ type: 'GET_PALETTE_FAVORITES', payload: response.data });
};
