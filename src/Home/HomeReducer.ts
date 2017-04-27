import * as Immutable from "immutable";
import {
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS
} from "./HomeActions";
import {createReducer} from "../redux/utils/reducers";

export interface IHomeState {
    activePageIndex: number
    activeViewIndex: number
    width: number
    height: number
}

let initialState : IHomeState = {
    activePageIndex: -1,
    activeViewIndex: -1,
    width: 1920,
    height: 1080
};

export let homeReducer = createReducer<IHomeState>(initialState, [
    {
        action: UPDATE__PAGE_INDEX,
        handler: function (state: IHomeState, action: UPDATE__PAGE_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activePageIndex'], action.activePageIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEW_INDEX,
        handler: function (state: IHomeState, action: UPDATE__VIEW_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activeViewIndex'], action.activeViewIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEWPORT_DIMENSIONS,
        handler: function (state: IHomeState, action: UPDATE__VIEWPORT_DIMENSIONS) {
            return Immutable.fromJS(state)
                .setIn(['width'], action.width)
                .setIn(['height'], action.height)
                .toJS();
        }
    }
]);
