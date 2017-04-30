import * as Immutable from "immutable";
import {
    ////GENERAL
    UPDATE__VIEWPORT_DIMENSIONS,
    ////NAVIGATION
    UPDATE__SAVED_PARAMS,
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    ////MODES
    OPEN__MENU
} from "./CyclopsActions";
import { createReducer } from "../../../../redux/utils/reducers";
import { ISavedParams } from './cyclopsData/models';
import { siteContent } from './cyclopsData/siteContent';

export interface ICyclopsState {
    width: number

    savedParams: ISavedParams
    activePageIndex: number
    activeViewIndex: number

    isMenuOpen: boolean
}

let initialState : ICyclopsState = {
    width: 1920,

    savedParams: {
        activePagePath: siteContent[0].name,
        needsAction: false
    },
    activePageIndex: 0,
    activeViewIndex: 0,

    isMenuOpen: true
};

export let cyclopsReducer = createReducer<ICyclopsState>(initialState, [
    ////GENERAL
    {
        action: UPDATE__VIEWPORT_DIMENSIONS,
        handler: function (state: ICyclopsState, action: UPDATE__VIEWPORT_DIMENSIONS) {
            return Immutable.fromJS(state)
                .setIn(['width'], action.width)
                .toJS();
        }
    },
    ////NAVIGATION
    {
        action: UPDATE__SAVED_PARAMS,
        handler: function (state: ICyclopsState, action: UPDATE__SAVED_PARAMS) {
            return Immutable.fromJS(state)
                .setIn(['savedParams'], action.savedParams)
                .toJS();
        }
    },
    {
        action: UPDATE__PAGE_INDEX,
        handler: function (state: ICyclopsState, action: UPDATE__PAGE_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activePageIndex'], action.activePageIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEW_INDEX,
        handler: function (state: ICyclopsState, action: UPDATE__VIEW_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activeViewIndex'], action.activeViewIndex)
                .toJS();
        }
    },
    ////MODES
    {
        action: OPEN__MENU,
        handler: function (state: ICyclopsState, action: OPEN__MENU) {
            return Immutable.fromJS(state)
                .setIn(['isMenuOpen'], action.isMenuOpen)
                .toJS();
        }
    }
]);
