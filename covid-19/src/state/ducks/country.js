import { createAction } from "redux-api-middleware";

// Action creators
export const getCountry = (code) =>
  createAction({
    endpoint: `http://localhost:3030/country/${code}`,
    method: "GET",
    types: [GET_COUNTRY_REQUEST, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAILURE],
  });

export const getComments = (code) =>
  createAction({
    endpoint: `http://localhost:3030/comments/${code}`,
    method: "GET",
    types: [GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE],
  });

export const deleteComment = (comment) =>
  createAction({
    endpoint: "http://localhost:3030/comments",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
    types: [
      DELETE_COMMENT_REQUEST,
      DELETE_COMMENT_SUCCESS,
      DELETE_COMMENT_FAILURE,
    ],
  });

export const postComment = (comment) =>
  createAction({
    endpoint: `http://localhost:3030/comment`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
    types: [POST_COMMENT_REQUEST, POST_COMMENT_SUCCESS, POST_COMMENT_FAILURE],
  });

// Reducer
export default function countryReducer(state = {}, action) {
  switch (action.type) {
    case GET_COUNTRY_SUCCESS:
      return { ...state, ...action.payload };
    case GET_COMMENTS_SUCCESS:
      return { ...state, ...action.payload };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, ...action.payload };
    case POST_COMMENT_SUCCESS:
      return { ...state, comments: [...state.comments, action.payload] };
    default:
      return state;
  }
}

// Selectors
export const countrySelector = (state) => {
  return state.countryReducer;
};

// Types
export const GET_COUNTRY_REQUEST = "covid/country/GET_COUNTRY_REQUEST";
export const GET_COUNTRY_SUCCESS = "covid/country/GET_COUNTRY_SUCCESS";
export const GET_COUNTRY_FAILURE = "covid/country/GET_COUNTRY_FAILURE";

export const GET_COMMENTS_REQUEST = "covid/country/GET_COMMENTS_REQUEST";
export const GET_COMMENTS_SUCCESS = "covid/country/GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "covid/country/GET_COMMENTS_FAILURE";

export const DELETE_COMMENT_REQUEST = "covid/country/DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "covid/country/DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "covid/country/DELETE_COMMENT_FAILURE";

export const POST_COMMENT_REQUEST = "covid/country/POST_COMMENT_REQUEST";
export const POST_COMMENT_SUCCESS = "covid/country/POST_COMMENT_SUCCESS";
export const POST_COMMENT_FAILURE = "covid/country/POST_COMMENT_FAILURE";
