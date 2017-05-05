import * as Immutable from "immutable";
import {AsyncGet, AsyncGetStatus} from "../../../redux/utils/async_get";
import {AsyncPost, AsyncPostStatus} from "../../../redux/utils/async_post";
import {
    IMAGE__UPLOAD__INIT,
    IMAGE__UPLOAD__SUCCESS,
    IMAGE__UPLOAD__FAILURE,
} from "./VideoEditorActions";
import {createReducer} from "../../../redux/utils/reducers";

export interface IVideoEditorState {
    imagePathId: AsyncPost<any,string>
}

let initialState : IVideoEditorState = {
    imagePathId: AsyncPost.init(null),
};

export let videoEditorReducer = createReducer<IVideoEditorState>(initialState, [
    /////////////////////////IMAGE UPLOAD/////////////////////////
    {
        action: IMAGE__UPLOAD__INIT,
        handler: function (state:IVideoEditorState, action:IMAGE__UPLOAD__INIT) {
            return Immutable.fromJS(state)
                .setIn(['imagePathId', 'status'], AsyncPostStatus.POSTING)
                .toJS();
        }
    },
    {
        action: IMAGE__UPLOAD__SUCCESS,
        handler: function (state:IVideoEditorState, action:IMAGE__UPLOAD__SUCCESS) {
            return Immutable.fromJS(state)
                .setIn(['imagePathId', 'status'], AsyncPostStatus.POSTED)
                .setIn(['imagePathId', 'data'], action.imagePathId)
                .toJS();
        }
    },
    {
        action: IMAGE__UPLOAD__FAILURE,
        handler: function (state:IVideoEditorState, action:IMAGE__UPLOAD__FAILURE) {
            return Immutable.fromJS(state)
                .setIn(['imagePathId', 'status'], AsyncPostStatus.ERROR)
                .setIn(['imagePathId', 'error'], action.error)
                .toJS();
        }
    },
]);
