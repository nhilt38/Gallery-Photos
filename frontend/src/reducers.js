const initialState = {
  user: null,
  authToken: null,
  pictures: [],
  currentPage: 0,
  picturePerPage: 10,
  pictureInView: null,
  comments: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "LOGIN":
      let { authToken, user } = action.payload;
      return { ...state, user, authToken };
    case "LOGOUT":
      return { ...state, user: null, authToken: null };
    case "LOAD_NEW_PAGE":
      var { pictures, page } = action.payload;
      if (page <= state.currentPage) {
        return state;
      }
      return {
        ...state,
        pictures: state.pictures.concat(pictures),
        currentPage: page,
      };
    case "SET_PICTURE_IN_VIEW":
      var { pictureInView } = action.payload;
      return { ...state, pictureInView };
    case "SET_COMMENTS":
      var { comments } = action.payload;
      return { ...state, comments };
    case "ADD_COMMENT":
      var { comment } = action.payload;
      return { ...state, comments: state.comments.concat([comment]) };
    default:
      return state;
  }
};

export default rootReducer;
