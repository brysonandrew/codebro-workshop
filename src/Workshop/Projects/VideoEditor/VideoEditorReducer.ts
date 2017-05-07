import * as Immutable from "immutable";
import {AsyncGet, AsyncGetStatus} from "../../../redux/utils/async_get";
import {AsyncPost, AsyncPostStatus} from "../../../redux/utils/async_post";
import {
    VIDEO__UPLOAD__INIT,
    VIDEO__UPLOAD__SUCCESS,
    VIDEO__UPLOAD__FAILURE,
    VIDEO__CONVERT__INIT,
    VIDEO__CONVERT__SUCCESS,
    VIDEO__CONVERT__FAILURE
} from "./VideoEditorActions";
import {createReducer} from "../../../redux/utils/reducers";

export interface IVideoEditorState {
    videoPathId: AsyncPost<any,string>
}

let initialState : IVideoEditorState = {
    videoPathId: AsyncPost.init(null),
};

export let videoEditorReducer = createReducer<IVideoEditorState>(initialState, [
    /////////////////////////VIDEO UPLOAD/////////////////////////
    {
        action: VIDEO__UPLOAD__INIT,
        handler: function (state:IVideoEditorState, action:VIDEO__UPLOAD__INIT) {
            return Immutable.fromJS(state)
                .setIn(['videoPathId', 'status'], AsyncPostStatus.POSTING)
                .toJS();
        }
    },
    {
        action: VIDEO__UPLOAD__SUCCESS,
        handler: function (state:IVideoEditorState, action:VIDEO__UPLOAD__SUCCESS) {
            return Immutable.fromJS(state)
                .setIn(['videoPathId', 'status'], AsyncPostStatus.POSTED)
                .setIn(['videoPathId', 'data'], action.videoPathId)
                .toJS();
        }
    },
    {
        action: VIDEO__UPLOAD__FAILURE,
        handler: function (state:IVideoEditorState, action:VIDEO__UPLOAD__FAILURE) {
            return Immutable.fromJS(state)
                .setIn(['videoPathId', 'status'], AsyncPostStatus.ERROR)
                .setIn(['videoPathId', 'error'], action.error)
                .toJS();
        }
    },
    /////////////////////////CONVERT VIDEO/////////////////////////
    {
        action: VIDEO__CONVERT__INIT,
        handler: function (state:IVideoEditorState, action:VIDEO__CONVERT__INIT) {
            return Immutable.fromJS(state)
                .setIn(['videoPathId', 'status'], AsyncPostStatus.POSTING)
                .toJS();
        }
    },
    {
        action: VIDEO__CONVERT__SUCCESS,
        handler: function (state:IVideoEditorState, action:VIDEO__CONVERT__SUCCESS) {
            return Immutable.fromJS(state)
                .setIn(['videoPathId', 'status'], AsyncPostStatus.POSTED)
                .setIn(['videoPathId', 'data'], action.videoPathId)
                .toJS();
        }
    },
    {
        action: VIDEO__CONVERT__FAILURE,
        handler: function (state:IVideoEditorState, action:VIDEO__CONVERT__FAILURE) {
            return Immutable.fromJS(state)
                .setIn(['videoPathId', 'status'], AsyncPostStatus.ERROR)
                .setIn(['videoPathId', 'error'], action.error)
                .toJS();
        }
    },
]);
