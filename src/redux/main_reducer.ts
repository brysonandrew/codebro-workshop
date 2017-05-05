import { combineReducers } from 'redux';

import { workshopReducer, IWorkshopState } from '../Workshop/WorkshopReducer';

import Reducer = Redux.Reducer;
/**
 * State of the admin panel store
 */
export interface IStoreState {
    workshopStore: IWorkshopState
}

export let reducer : Reducer<IStoreState> = combineReducers({
    workshopStore: workshopReducer
    // Add other reducers here
}) as Reducer<IStoreState>;