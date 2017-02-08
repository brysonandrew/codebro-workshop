import {
    UPDATE__MENU_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS
} from "./HomeActions";
import { createAction } from "../redux/utils/actions";

export function changeMenuIndex(menuIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__MENU_INDEX>(UPDATE__MENU_INDEX.type, {
            menuIndex: menuIndex,
        }));
    }
}

export function changeViewportDimensions(width, height) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEWPORT_DIMENSIONS>(UPDATE__VIEWPORT_DIMENSIONS.type, {
            width: width,
            height: height,
        }));
    }
}