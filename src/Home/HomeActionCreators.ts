import {
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS
} from "./HomeActions";
import { createAction } from "../redux/utils/actions";

export function changeViewportDimensions(width, height) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEWPORT_DIMENSIONS>(UPDATE__VIEWPORT_DIMENSIONS.type, {
            width: width,
            height: height,
        }));
    }
}

export function changePageIndex(pageIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__PAGE_INDEX>(UPDATE__PAGE_INDEX.type, {
            pageIndex: pageIndex,
        }));
    }
}

export function changeViewIndex(viewIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEW_INDEX>(UPDATE__VIEW_INDEX.type, {
            viewIndex: viewIndex,
        }));
    }
}
