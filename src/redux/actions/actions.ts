import {IStats} from "../../models";

export module FETCH_ALL__INIT {
    export let type = "FETCH_ALL__INIT";
}

export interface FETCH_ALL__INIT {
}

export module FETCH_ALL__SUCCESS {
    export let type = "FETCH_ALL__SUCCESS";
}

export interface FETCH_ALL__SUCCESS {
    stats: IStats
}

export module FETCH_ALL__FAILURE {
    export let type = "FETCH_ALL__FAILURE";
}

export interface FETCH_ALL__FAILURE {
    error: Object;
}

export module UPDATE__FILTER {
    export let type = "UPDATE__FILTER";
}

export interface UPDATE__FILTER {
    filterIndex: number;
    isActive: boolean;
}

export module UPDATE__SEARCH {
    export let type = "UPDATE__SEARCH";
}

export interface UPDATE__SEARCH {
    searchText: string;
}

export module UPDATE__SORT {
    export let type = "UPDATE__SORT";
}

export interface UPDATE__SORT {
    sortIndex: number;
    isSortReversed: boolean;
}
