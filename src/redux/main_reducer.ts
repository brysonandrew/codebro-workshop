import { combineReducers } from 'redux';

import { workshopReducer, IWorkshopState } from '../Workshop/WorkshopReducer';
import { videoEditorReducer, IVideoEditorState } from '../Workshop/Projects/VideoEditor/VideoEditorReducer';

import Reducer = Redux.Reducer;
/**
 * State of the admin panel store
 */
export interface IStoreState {
    workshopStore: IWorkshopState,
    videoEditorStore: IVideoEditorState
}

export let reducer : Reducer<IStoreState> = combineReducers({
    workshopStore: workshopReducer,
    videoEditorStore: videoEditorReducer
    // Add other reducers here
}) as Reducer<IStoreState>;