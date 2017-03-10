import * as Immutable from "immutable";
import {
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS
} from "./HomeActions";
import {createReducer} from "../redux/utils/reducers";

export interface ISubState {
    pageIndex: number
    viewIndex: number
    width: number
    height: number
}

let initialState : ISubState = {
    pageIndex: -1,
    viewIndex: -1,
    width: 1920,
    height: 1080
};

export let subReducer = createReducer<ISubState>(initialState, [
    {
        action: UPDATE__PAGE_INDEX,
        handler: function (state: ISubState, action: UPDATE__PAGE_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['pageIndex'], action.pageIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEW_INDEX,
        handler: function (state: ISubState, action: UPDATE__VIEW_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['viewIndex'], action.viewIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEWPORT_DIMENSIONS,
        handler: function (state: ISubState, action: UPDATE__VIEWPORT_DIMENSIONS) {
            return Immutable.fromJS(state)
                .setIn(['width'], action.width)
                .setIn(['height'], action.height)
                .toJS();
        }
    }
]);
