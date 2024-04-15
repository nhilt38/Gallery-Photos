import * as api from "./api";

export const logout = (dispatch) => {
  localStorage.removeItem("auth_token");
  dispatch({ type: "LOGOUT" });
};

export const autoLogin = async (dispatch) => {
  dispatch({ type: "START_LOADING" });
  try {
    let authToken = localStorage.getItem("auth_token");
    if (authToken) {
      let user = await api.getProfileWithToken(authToken);
      if (user) {
        dispatch({ type: "LOGIN", payload: { user, authToken } });
      }
    }
  } catch (e) {
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

export const login = async (dispatch, credentials) => {
  dispatch({ type: "START_LOADING" });
  try {
    let authToken = await api.login(credentials);
    let user = await api.getProfileWithToken(authToken);
    if (user) {
      localStorage.setItem("auth_token", authToken);
      dispatch({ type: "LOGIN", payload: { user, authToken } });
    }
  } catch (e) {
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};
export const register = async (dispatch, credentials) => {
  dispatch({ type: "START_LOADING" });
  try {
    await api.register(credentials);
    return true;
  } catch (e) {
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
  return false;
};

export const fetchMorePictures = async (dispatch, page, picturePerPage) => {
  dispatch({ type: "START_LOADING" });
  let pictures = await api.fetchPictures(page, picturePerPage);
  if (pictures.length !== 0) {
    dispatch({ type: "LOAD_NEW_PAGE", payload: { pictures, page } });
  }
  dispatch({ type: "STOP_LOADING" });
  return pictures.length !== 0;
};

export const viewSinglePicture = async (dispatch, id) => {
  dispatch({ type: "START_LOADING" });
  let pictureInView = await api.fetchPicture(id);
  dispatch({ type: "SET_PICTURE_IN_VIEW", payload: { pictureInView } });
  dispatch({ type: "STOP_LOADING" });
};

export const postPicture = async (dispatch, file, authToken) => {
  let picture = await api.uploadPicture(file, authToken);
  dispatch({ type: "ADD_PICTURES", payload: { pictures: [picture] } });
};
export const postPictures = async (dispatch, files, authToken) => {
  let pictures = await api.uploadPictures(files, authToken);
  dispatch({ type: "ADD_PICTURES", payload: { pictures } });
};

export const fetchComments = async (dispatch, id) => {
  dispatch({ type: "START_LOADING" });
  let comments = await api.fetchComments(id);
  dispatch({ type: "SET_COMMENTS", payload: { comments } });
  dispatch({ type: "STOP_LOADING" });
};

export const postComment = async (dispatch, id, text, authToken) => {
  let comment = await api.writeComment(id, text, authToken);
  dispatch({ type: "ADD_COMMENT", payload: { comment } });
};
