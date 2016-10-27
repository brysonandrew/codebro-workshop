import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {reducer, IStoreState} from "../reducers/main_reducer";
const createLogger = require('redux-logger');

const logger = createLogger();

export var store : Redux.Store<IStoreState> = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);
