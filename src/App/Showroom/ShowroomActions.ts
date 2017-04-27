// import {IStats} from "../models";

export module FETCH_ALL__INIT {
    export let type = "FETCH_ALL__INIT";
}

export interface FETCH_ALL__INIT {
}

export module FETCH_ALL__SUCCESS {
    export let type = "FETCH_ALL__SUCCESS";
}

export interface FETCH_ALL__SUCCESS {
    info: any
}

export module FETCH_ALL__FAILURE {
    export let type = "FETCH_ALL__FAILURE";
}

export interface FETCH_ALL__FAILURE {
    error: Object;
}
