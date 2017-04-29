import * as Immutable from "immutable";
import {
    UPDATE__VIEWPORT_DIMENSIONS,
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    OPEN__MENU
} from "./SphinxActions";
import {createReducer} from "../../../../redux/utils/reducers";

export interface ISphinxState {
    width: number
    height: number
    activePageIndex: number
    activeViewIndex: number
    isMenuOpen: boolean
}

let initialState : ISphinxState = {
    width: 1920,
    height: 1080,
    activePageIndex: 0,
    activeViewIndex: 0,
    isMenuOpen: false
};

export let sphinxReducer = createReducer<ISphinxState>(initialState, [
    {
        action: UPDATE__VIEWPORT_DIMENSIONS,
        handler: function (state: ISphinxState, action: UPDATE__VIEWPORT_DIMENSIONS) {
            return Immutable.fromJS(state)
                .setIn(['width'], action.width)
                .setIn(['height'], action.height)
                .toJS();
        }
    },
    {
        action: UPDATE__PAGE_INDEX,
        handler: function (state: ISphinxState, action: UPDATE__PAGE_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activePageIndex'], action.activePageIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEW_INDEX,
        handler: function (state: ISphinxState, action: UPDATE__VIEW_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activeViewIndex'], action.activeViewIndex)
                .toJS();
        }
    },
    {
        action: OPEN__MENU,
        handler: function (state: ISphinxState, action: OPEN__MENU) {
            return Immutable.fromJS(state)
                .setIn(['isMenuOpen'], action.isMenuOpen)
                .toJS();
        }
    }
]);
