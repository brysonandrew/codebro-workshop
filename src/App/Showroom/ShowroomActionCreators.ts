import {
    FETCH_ALL__INIT,
    FETCH_ALL__SUCCESS,
    FETCH_ALL__FAILURE
} from "./showroomActions";
import {createAction, checkServerError} from "../../redux/utils/actions";

export function fetchAll(subject) {
    return dispatch => {
        // Dispatch the init action before fetching the data
        dispatch(createAction(FETCH_ALL__INIT.type, {}));
        fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${subject}&prop=revisions&rvprop=content&format=json`, {
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
