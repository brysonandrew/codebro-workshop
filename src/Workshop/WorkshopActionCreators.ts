import {
    FETCH_ALL__INIT,
    FETCH_ALL__SUCCESS,
    FETCH_ALL__FAILURE,
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS
} from "./WorkshopActions";
import {createAction, checkServerError} from "../redux/utils/actions";

export function changeViewportDimensions(width, height) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEWPORT_DIMENSIONS>(UPDATE__VIEWPORT_DIMENSIONS.type, {
            width: width,
            height: height,
        }));
    }
}

export function changePageIndex(activePageIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__PAGE_INDEX>(UPDATE__PAGE_INDEX.type, {
            activePageIndex: activePageIndex,
        }));
    }
}

export function changeViewIndex(activeViewIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEW_INDEX>(UPDATE__VIEW_INDEX.type, {
            activeViewIndex: activeViewIndex,
        }));
    }
}

export function fetchAPIInfo(subject) {
    // console.log(subject);
    return dispatch => {
        // Dispatch the init action before fetching the data
        dispatch(createAction(FETCH_ALL__INIT.type, {}));
        fetch(`http://poetrydb.org/title/Ozymandias/lines.json`, {
            method : 'GET',
            headers: {
                'Accept'      : 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then((res: any) => { return res.json(); })
            .then(checkServerError)
            .then((result) => {
                dispatch(
                    createAction<FETCH_ALL__SUCCESS>(FETCH_ALL__SUCCESS.type, {
                        info: result
                    })
                );
            })
            .catch((result) => {
                dispatch(
                    createAction<FETCH_ALL__FAILURE>(FETCH_ALL__FAILURE.type, {
                        error: result
                    })
                );
            });
    }
}
