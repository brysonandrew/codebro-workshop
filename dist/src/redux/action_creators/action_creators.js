"use strict";
var actions_1 = require("../utils/actions");
var actions_2 = require("../actions/actions");
var $ = require('jquery');
function fetchAll() {
    return function (dispatch) {
        dispatch(actions_1.createAction(actions_2.FETCH_ALL__INIT.type, {}));
        $.ajax({
            method: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            success: function (data) {
                dispatch(actions_1.createAction(actions_2.FETCH_ALL__SUCCESS.type, {
                    stats: data
                }));
            }
        });
    };
}
exports.fetchAll = fetchAll;
function changeFilter(filterIndex, isActive) {
    return function (dispatch) {
        dispatch(actions_1.createAction(actions_2.UPDATE__FILTER.type, {
            filterIndex: filterIndex,
            isActive: isActive
        }));
    };
}
exports.changeFilter = changeFilter;
function changeSearch(searchText) {
    return function (dispatch) {
        dispatch(actions_1.createAction(actions_2.UPDATE__SEARCH.type, {
            searchText: searchText
        }));
    };
}
exports.changeSearch = changeSearch;
function changeSort(sortIndex, isSortReversed) {
    return function (dispatch) {
        dispatch(actions_1.createAction(actions_2.UPDATE__SORT.type, {
            sortIndex: sortIndex,
            isSortReversed: isSortReversed
        }));
    };
}
exports.changeSort = changeSort;
//# sourceMappingURL=action_creators.js.map