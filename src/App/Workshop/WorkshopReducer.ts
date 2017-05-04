import * as Immutable from "immutable";
import {AsyncGet, AsyncGetStatus} from "../../redux/utils/async_get";
//import {AsyncPost, AsyncPostStatus} from "../utils/async_post";
import {
    FETCH_ALL__INIT,
    FETCH_ALL__SUCCESS,
    FETCH_ALL__FAILURE
} from "./WorkshopActions";
import {createReducer} from "../../redux/utils/reducers";
// import {IAlbum, IFilters, IColumns} from "../../models";

export interface IWorkshopState {
    info: AsyncGet<any[]>;                        // The events data as an AsyncGet
}

let initialState : IWorkshopState = {
    info: AsyncGet.init(null),
};

export let workshopReducer = createReducer<IWorkshopState>(initialState, [
    {
        action: FETCH_ALL__INIT,
        handler: function (state:IWorkshopState, action:FETCH_ALL__INIT) {
            return Immutable.fromJS(state)
                .setIn(['info', 'status'], AsyncGetStatus.FETCHING)
                .toJS();
        }
    },
    {
        action: FETCH_ALL__SUCCESS,
        handler: function (state:IWorkshopState, action:FETCH_ALL__SUCCESS) {
            return Immutable.fromJS(state)
                .setIn(['info', 'status'], AsyncGetStatus.FETCHED)
                .setIn(['info', 'value'], action.info)
                .toJS();
        }
    },
    {
        action: FETCH_ALL__FAILURE,
        handler: function (state: IWorkshopState, action: FETCH_ALL__FAILURE) {
            return Immutable.fromJS(state)
                .setIn(['info', 'status'], AsyncGetStatus.ERROR)
                .setIn(['info', 'error'], action.error)
                .toJS();
        }
    }
]);
