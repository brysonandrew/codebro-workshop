import * as Immutable from "immutable";
import {AsyncGet, AsyncGetStatus} from "../utils/async_get";
//import {AsyncPost, AsyncPostStatus} from "../utils/async_post";
import {
    FETCH_ALL__INIT,
    FETCH_ALL__SUCCESS,
    FETCH_ALL__FAILURE,
    UPDATE__FILTER,
    UPDATE__SEARCH,
    UPDATE__SORT
} from "../actions/actions";
import {createReducer} from "../utils/reducers";
import {IAlbum, IFilters, IColumns} from "../../models";
import {statFilters} from "../../data/StatFilters";
import {statColumns} from "../../data/StatColumns";

export interface ISubState {
    stats: AsyncGet<IAlbum[]>;                        // The events data as an AsyncGet
    filters: IFilters[];
    searchBarTyped: string;
    sortByColumnIndex: number;
    columns: IColumns[];
}

let initialState : ISubState = {
    stats: AsyncGet.init(null),
    filters: statFilters,
    searchBarTyped: "",
    sortByColumnIndex: 0,
    columns: statColumns
};

let accumulatedAlbumItems = [];

export let subReducer = createReducer<ISubState>(initialState, [
    {
        action: FETCH_ALL__INIT,
        handler: function (state:ISubState, action:FETCH_ALL__INIT) {
            return Immutable.fromJS(state)
                .setIn(['stats', 'status'], AsyncGetStatus.FETCHING)
                .toJS();
        }
    },
    {
        action: FETCH_ALL__SUCCESS,
        handler: function (state:ISubState, action:FETCH_ALL__SUCCESS) {
            accumulatedAlbumItems.push(action.stats.albums.items);
            let mergedAlbumItems = [].concat.apply([], accumulatedAlbumItems);
            return Immutable.fromJS(state)
                .setIn(['stats', 'status'], AsyncGetStatus.FETCHED)
                .setIn(['stats', 'value'], mergedAlbumItems)
                .toJS();
        }
    },
    {
        action: FETCH_ALL__FAILURE,
        handler: function (state: ISubState, action: FETCH_ALL__FAILURE) {
            return Immutable.fromJS(state)
                .setIn(['stats', 'status'], AsyncGetStatus.ERROR)
                .setIn(['stats', 'error'], action.error)
                .toJS();
        }
    },
    {
      action: UPDATE__FILTER,
      handler: function (state: ISubState, action: UPDATE__FILTER) {
            return Immutable.fromJS(state)
                .setIn(['filters' , action.filterIndex , 'active'], action.isActive)
                .toJS();
        }
    },
    {
        action: UPDATE__SEARCH,
        handler: function (state: ISubState, action: UPDATE__SEARCH) {
            return Immutable.fromJS(state)
                .setIn(['searchBarTyped'], action.searchText)
                .toJS();
        }
    },
    {
        action: UPDATE__SORT,
        handler: function (state: ISubState, action: UPDATE__SORT) {
            return Immutable.fromJS(state)
                .setIn(['sortByColumnIndex'], action.sortIndex)
                .setIn(['columns' , action.sortIndex , 'isSortReversed'], action.isSortReversed)
                .toJS();
        }
    }
]);
