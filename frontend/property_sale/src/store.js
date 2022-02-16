import { combineReducers, createStore } from "redux";
import reducer from './reducers/index';

export default createStore(reducer);
