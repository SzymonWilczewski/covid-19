import { createAction } from "redux-api-middleware";

// Action creators
export const getCountryEdit = (code) =>
  createAction({
    endpoint: `http://localhost:3030/country/${code}`,
    method: "GET",
    types: [
      GET_COUNTRY_EDIT_REQUEST,
      GET_COUNTRY_EDIT_SUCCESS,
      GET_COUNTRY_EDIT_FAILURE,
    ],
  });

export const putCountryEdit = (country) =>
  createAction({
    endpoint: `http://localhost:3030/country/${country.code}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(country),
    types: [
      PUT_COUNTRY_EDIT_REQUEST,
      PUT_COUNTRY_EDIT_SUCCESS,
      PUT_COUNTRY_EDIT_FAILURE,
    ],
  });

// Reducer
const initialState = {
  name: "",
  code: "",
  population: 0,
  updated_at: "",
  today: {
    deaths: 0,
    confirmed: 0,
  },
  latest_data: {
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    critical: 0,
    calculated: {
      cases_per_million_population: 0,
    },
  },
};

export default function countryEditReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRY_EDIT_SUCCESS:
      return action.payload;
    case PUT_COUNTRY_EDIT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

// Selectors
export const countryEditSelector = (state) => {
  return state.countryEditReducer;
};

// Types
export const GET_COUNTRY_EDIT_REQUEST = "covid/edit/GET_REQUEST";
export const GET_COUNTRY_EDIT_SUCCESS = "covid/edit/GET_SUCCESS";
export const GET_COUNTRY_EDIT_FAILURE = "covid/edit/GET_FAILURE";

export const PUT_COUNTRY_EDIT_REQUEST = "covid/edit/PUT_REQUEST";
export const PUT_COUNTRY_EDIT_SUCCESS = "covid/edit/PUT_SUCCESS";
export const PUT_COUNTRY_EDIT_FAILURE = "covid/edit/PUT_FAILURE";
