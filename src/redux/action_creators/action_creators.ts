import {createAction} from "../utils/actions";
import {
    FETCH_ALL__INIT,
    FETCH_ALL__SUCCESS,
    UPDATE__FILTER,
    UPDATE__SEARCH,
    UPDATE__SORT
} from "../actions/actions";
import {IStats} from "../../models";

var $ = require('jquery');

export function fetchAll() {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction(FETCH_ALL__INIT.type, {}));
        $.ajax({
            method: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            success: function (data) {
                dispatch(
                    createAction<FETCH_ALL__SUCCESS>(FETCH_ALL__SUCCESS.type, {
                        stats: data
                    })
                );
            }
        });
    }
}

export function changeFilter(filterIndex, isActive) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__FILTER>(UPDATE__FILTER.type, {
          filterIndex: filterIndex,
          isActive: isActive
        }));
    }
}

export function changeSearch(searchText) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__SEARCH>(UPDATE__SEARCH.type, {
          searchText: searchText
        }));
    }
}

export function changeSort(sortIndex, isSortReversed) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__SORT>(UPDATE__SORT.type, {
          sortIndex: sortIndex,
          isSortReversed: isSortReversed
        }));
    }
}
