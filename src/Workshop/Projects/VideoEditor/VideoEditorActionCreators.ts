import {
    VIDEO__CONVERT__INIT,
    VIDEO__CONVERT__SUCCESS,
    VIDEO__CONVERT__FAILURE,
    VIDEO__UPLOAD__INIT,
    VIDEO__UPLOAD__SUCCESS,
    VIDEO__UPLOAD__FAILURE,
} from "./VideoEditorActions";

import {createAction, checkServerError} from "../../../redux/utils/actions";

export function uploadVideo(imageFormData) {
    return dispatch => {
        // We dispatch the init action before updating the data
        dispatch(createAction(VIDEO__UPLOAD__INIT.type, {}));
        fetch("/video-editor/upload-video", {
            method     : 'POST',
            body       : imageFormData
        })
        .then((res) => res.json())
        .then(checkServerError)
        .then((result) => {
            dispatch(
                createAction<VIDEO__UPLOAD__SUCCESS>(VIDEO__UPLOAD__SUCCESS.type, {
                    videoPathId: result["data"]
                })
            );
        })
        .catch((result) => {
            dispatch(
                createAction<VIDEO__UPLOAD__FAILURE>(VIDEO__UPLOAD__FAILURE.type, {
                    error: result["error"]
                })
            );
        });
    }
}

export function convertVideo(videoPath) {
    return dispatch => {
        // We dispatch the init action before updating the data
        dispatch(createAction(VIDEO__CONVERT__INIT.type, {}));
        fetch("/video-editor/convert-video", {
            method     : 'POST',
            body       : videoPath
        })
            .then((res) => res.json())
            .then(checkServerError)
            .then((result) => {
                dispatch(
                    createAction<VIDEO__CONVERT__SUCCESS>(VIDEO__CONVERT__SUCCESS.type, {
                        videoPathId: result["data"]
                    })
                );
            })
            .catch((result) => {
                dispatch(
                    createAction<VIDEO__CONVERT__FAILURE>(VIDEO__CONVERT__FAILURE.type, {
                        error: result["error"]
                    })
                );
            });
    }
}