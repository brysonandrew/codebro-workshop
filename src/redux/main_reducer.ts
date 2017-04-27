import {combineReducers} from 'redux';
import {homeReducer, IHomeState} from '../Home/HomeReducer';
import {showroomReducer, IShowroomState} from '../App/Showroom/ShowroomReducer';
import Reducer = Redux.Reducer;
/**
 * State of the admin panel store
 */
export interface IStoreState {
    homeStore: IHomeState
    showroomStore: IShowroomState
}

export let reducer : Reducer<IStoreState> = combineReducers({
    homeStore: homeReducer,
    showroomStore: showroomReducer
    // Add other reducers here
}) as Reducer<IStoreState>;
