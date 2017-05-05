import { combineReducers } from 'redux';

import { workshopReducer, IWorkshopState } from '../Workshop/WorkshopReducer';

import Reducer = Redux.Reducer;
import { ICyclopsState, cyclopsReducer } from "../App/Showroom/Sites/Cyclops/CyclopsReducer";
import { ISphinxState, sphinxReducer } from "../App/Showroom/Sites/Sphinx/SphinxReducer";
/**
 * State of the admin panel store
 */
export interface IStoreState {
    workshopStore: IWorkshopState
    cyclopsStore: ICyclopsState
    sphinxStore: ISphinxState
}

export let reducer : Reducer<IStoreState> = combineReducers({
    workshopStore: workshopReducer,
    cyclopsStore: cyclopsReducer,
    sphinxStore: sphinxReducer
    // Add other reducers here
}) as Reducer<IStoreState>;
