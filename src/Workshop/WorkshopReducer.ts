import * as Immutable from "immutable";
import {AsyncGet, AsyncGetStatus} from "../redux/utils/async_get";
//import {AsyncPost, AsyncPostStatus} from "../utils/async_post";
import {
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS,
    FETCH_ALL__INIT,
    FETCH_ALL__SUCCESS,
    FETCH_ALL__FAILURE
} from "./WorkshopActions";
import {createReducer} from "../redux/utils/reducers";

export interface IWorkshopState {
    activePageIndex: number
    activeViewIndex: number
    width: number
    info: AsyncGet<any[]>                        // The events data as an AsyncGet
}

let initialState : IWorkshopState = {
    info: AsyncGet.init(null),
    activePageIndex: -1,
    activeViewIndex: -1,
    width: 1920
};

export let workshopReducer = createReducer<IWorkshopState>(initialState, [
    {
        action: UPDATE__PAGE_INDEX,
        handler: function (state: IWorkshopState, action: UPDATE__PAGE_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activePageIndex'], action.activePageIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEW_INDEX,
        handler: function (state: IWorkshopState, action: UPDATE__VIEW_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activeViewIndex'], action.activeViewIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEWPORT_DIMENSIONS,
        handler: function (state: IWorkshopState, action: UPDATE__VIEWPORT_DIMENSIONS) {
            return Immutable.fromJS(state)
                .setIn(['width'], action.width)
                .setIn(['height'], action.height)
                .toJS();
        }
    },
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
