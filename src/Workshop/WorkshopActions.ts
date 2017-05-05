// import {IStats} from "../models";
export module UPDATE__PAGE_INDEX {
    export let type = "UPDATE__PAGE_INDEX";
}

export interface UPDATE__PAGE_INDEX {
    activePageIndex: number;
}

export module UPDATE__VIEW_INDEX {
    export let type = "UPDATE__VIEW_INDEX";
}

export interface UPDATE__VIEW_INDEX {
    activeViewIndex: number;
}

export module UPDATE__VIEWPORT_DIMENSIONS {
    export let type = "UPDATE__VIEWPORT_DIME";
}

export interface UPDATE__VIEWPORT_DIMENSIONS {
    width: number
    height: number
}

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
