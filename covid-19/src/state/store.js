import { createStore, applyMiddleware, combineReducers } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import countriesReducer from "./ducks/countries";
import countryReducer from "./ducks/country";
import countryEditReducer from "./ducks/edit";

const rootReducer = combineReducers({
  countriesReducer,
  countryReducer,
  countryEditReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(apiMiddleware, thunk))
);

export default store;
