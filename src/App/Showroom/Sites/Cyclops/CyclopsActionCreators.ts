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
import { createAction } from "../../../../redux/utils/actions";
////GENERAL
export function setViewportWidth(width) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEWPORT_DIMENSIONS>(UPDATE__VIEWPORT_DIMENSIONS.type, {
            width: width
        }));
    }
}
////NAVIGATION
export function saveParams(nextSavedParams) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__SAVED_PARAMS>(UPDATE__SAVED_PARAMS.type, {
            savedParams: nextSavedParams,
        }));
    }
}

export function setPageIndex(activePageIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__PAGE_INDEX>(UPDATE__PAGE_INDEX.type, {
            activePageIndex: activePageIndex,
        }));
    }
}

export function setViewIndex(activeViewIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEW_INDEX>(UPDATE__VIEW_INDEX.type, {
            activeViewIndex: activeViewIndex,
        }));
    }
}
////MODES
export function openMenu(isMenuOpen) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<OPEN__MENU>(OPEN__MENU.type, {
            isMenuOpen: isMenuOpen,
        }));
    }
}
