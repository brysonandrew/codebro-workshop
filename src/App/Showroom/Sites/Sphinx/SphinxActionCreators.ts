import {
    UPDATE__VIEWPORT_DIMENSIONS,
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    OPEN__MENU
} from "./SphinxActions";
import { createAction } from "../../../../redux/utils/actions";

export function setViewportDimensions(width, height) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEWPORT_DIMENSIONS>(UPDATE__VIEWPORT_DIMENSIONS.type, {
            width: width,
            height: height,
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

export function openMenu(isMenuOpen) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<OPEN__MENU>(OPEN__MENU.type, {
            isMenuOpen: isMenuOpen,
        }));
    }
}
