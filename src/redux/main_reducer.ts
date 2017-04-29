import {combineReducers} from 'redux';

import {sphinxReducer, ISphinxState} from '../App/Showroom/Sites/Sphinx/SphinxReducer';
import {showroomReducer, IShowroomState} from '../App/Showroom/ShowroomReducer';

import {homeReducer, IHomeState} from '../Home/HomeReducer';
import Reducer = Redux.Reducer;
/**
 * State of the admin panel store
 */
export interface IStoreState {
    homeStore: IHomeState

    showroomStore: IShowroomState,
    sphinxStore: ISphinxState
}

export let reducer : Reducer<IStoreState> = combineReducers({
    homeStore: homeReducer,

    showroomStore: showroomReducer,
    sphinxStore: sphinxReducer
    // Add other reducers here
}) as Reducer<IStoreState>;
