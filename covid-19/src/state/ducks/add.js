import { createAction } from "redux-api-middleware";

// Action creators
export const postCountryAdd = (country, setErrors) =>
  createAction({
    endpoint: `http://localhost:3030/countries/${country.code}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(country),
    types: [
      POST_COUNTRY_ADD_REQUEST,
      POST_COUNTRY_ADD_SUCCESS,
      {
        type: POST_COMMENT_ADD_FAILURE,
        payload: (action, state, res) => {
          res.json().then((json) => setErrors({ code: json.message }));
        },
      },
    ],
  });

export const postCommentAdd = (comment) =>
  createAction({
    endpoint: `http://localhost:3030/comment`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
    types: [
      POST_COMMENT_ADD_REQUEST,
      POST_COMMENT_ADD_SUCCESS,
      POST_COMMENT_ADD_FAILURE,
    ],
  });

// Types
export const POST_COUNTRY_ADD_REQUEST = "covid/add/POST_COUNTRY_REQUEST";
export const POST_COUNTRY_ADD_SUCCESS = "covid/add/POST_COUNTRY_SUCCESS";
export const POST_COUNTRY_ADD_FAILURE = "covid/add/POST_COUNTRY_FAILURE";

export const POST_COMMENT_ADD_REQUEST = "covid/add/POST_COMMENT_REQUEST";
export const POST_COMMENT_ADD_SUCCESS = "covid/add/POST_COMMENT_SUCCESS";
export const POST_COMMENT_ADD_FAILURE = "covid/add/POST_COMMENT_FAILURE";
