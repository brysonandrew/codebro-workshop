import {
    IMAGE__UPLOAD__INIT,
    IMAGE__UPLOAD__SUCCESS,
    IMAGE__UPLOAD__FAILURE,
} from "./VideoEditorActions";

import {createAction, checkServerError} from "../../../redux/utils/actions";
export function uploadImage(imageFormData) {
    return dispatch => {
        // We dispatch the init action before updating the data
        dispatch(createAction(IMAGE__UPLOAD__INIT.type, {}));
        fetch("/video-editor/upload-image", {
            method     : 'POST',
            body       : imageFormData
        })
        .then((res) => res.json())
        .then(checkServerError)
        .then((result) => {
            dispatch(
                createAction<IMAGE__UPLOAD__SUCCESS>(IMAGE__UPLOAD__SUCCESS.type, {
                    imagePathId: result["data"]
                })
            );
        })
        .catch((result) => {
            dispatch(
                createAction<IMAGE__UPLOAD__FAILURE>(IMAGE__UPLOAD__FAILURE.type, {
                    error: result["error"]
                })
            );
        });
    }
}
