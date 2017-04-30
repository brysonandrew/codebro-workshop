import {combineReducers} from 'redux';

import {sphinxReducer, ISphinxState} from '../App/Showroom/Sites/Sphinx/SphinxReducer';
import {showroomReducer, IShowroomState} from '../App/Showroom/ShowroomReducer';

import {homeReducer, IHomeState} from '../Home/HomeReducer';
import Reducer = Redux.Reducer;
import {ICyclopsState, cyclopsReducer} from "../App/Showroom/Sites/Cyclops/CyclopsReducer";
/**
 * State of the admin panel store
 */
export interface IStoreState {
    homeStore: IHomeState

    showroomStore: IShowroomState,
    sphinxStore: ISphinxState,
    cyclopsStore: ICyclopsState
}

export let reducer : Reducer<IStoreState> = combineReducers({
    homeStore: homeReducer,

    showroomStore: showroomReducer,
    sphinxStore: sphinxReducer,
    cyclopsStore: cyclopsReducer
    // Add other reducers here
}) as Reducer<IStoreState>;
