import { createAction } from "redux-api-middleware";

// Action creators
export const getCountries = () =>
  createAction({
    endpoint: "http://localhost:3030/countries",
    method: "GET",
    types: [
      GET_COUNTRIES_REQUEST,
      GET_COUNTRIES_SUCCESS,
      GET_COUNTRIES_FAILURE,
    ],
  });

export const deleteCountry = (country) =>
  createAction({
    endpoint: "http://localhost:3030/countries",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: country.code,
    }),
    types: [
      DELETE_COUNTRY_REQUEST,
      DELETE_COUNTRY_SUCCESS,
      DELETE_COUNTRY_FAILURE,
    ],
  });

// Reducer
export default function countriesReducer(state = [], action) {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return action.payload;
    case DELETE_COUNTRY_SUCCESS:
      return state.filter((country) => country.code !== action.payload.code);
    default:
      return state;
  }
}

// Selectors
export const countriesSelector = (state) => {
  return state.countriesReducer;
};

// Types
export const GET_COUNTRIES_REQUEST = "covid/countries/GET_REQUEST";
export const GET_COUNTRIES_SUCCESS = "covid/countries/GET_SUCCESS";
export const GET_COUNTRIES_FAILURE = "covid/countries/GET_FAILURE";

export const DELETE_COUNTRY_REQUEST = "covid/countries/DELETE_REQUEST";
export const DELETE_COUNTRY_SUCCESS = "covid/countries/DELETE_SUCCESS";
export const DELETE_COUNTRY_FAILURE = "covid/countries/DELETE_FAILURE";
