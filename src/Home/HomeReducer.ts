import * as Immutable from "immutable";
import {
    UPDATE__MENU_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS
} from "./HomeActions";
import {createReducer} from "../redux/utils/reducers";

export interface ISubState {
    menuIndex: number
    width: number
    height: number
}

let initialState : ISubState = {
    menuIndex: -1,
    width: 1920,
    height: 1080
};

export let subReducer = createReducer<ISubState>(initialState, [
    {
        action: UPDATE__MENU_INDEX,
        handler: function (state: ISubState, action: UPDATE__MENU_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['menuIndex'], action.menuIndex)
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
