import {combineReducers} from 'redux';
import {subReducer, ISubState} from '../Home/HomeReducer';
import Reducer = Redux.Reducer;
/**
 * State of the admin panel store
 */
export interface IStoreState {
    subStore: ISubState
}

export let reducer : Reducer<IStoreState> = combineReducers({
    subStore: subReducer
    // Add other reducers here
}) as Reducer<IStoreState>;
