import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middlewares = applyMiddleware(thunk);
middlewares = composeEnhancers(middlewares);

export default createStore(rootReducer, middlewares);
