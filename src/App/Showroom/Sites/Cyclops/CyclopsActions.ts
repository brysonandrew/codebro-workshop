import { ISavedParams } from './cyclopsData/models';

export module UPDATE__VIEWPORT_DIMENSIONS {
    export let type = "UPDATE__VIEWPORT_DIME";
}

export interface UPDATE__VIEWPORT_DIMENSIONS {
    width: number
}

export module UPDATE__SAVED_PARAMS {
    export let type = "UPDATE__SAVED_PARAMS";
}
export interface UPDATE__SAVED_PARAMS {
    savedParams: ISavedParams;
}

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

export module OPEN__MENU {
    export let type = "OPEN__MENU";
}
export interface OPEN__MENU {
    isMenuOpen: boolean;
}
