export module UPDATE__PAGE_INDEX {
    export let type = "UPDATE__PAGE_INDEX";
}

export interface UPDATE__PAGE_INDEX {
    pageIndex: number;
}

export module UPDATE__VIEW_INDEX {
    export let type = "UPDATE__VIEW_INDEX";
}

export interface UPDATE__VIEW_INDEX {
    viewIndex: number;
}

export module UPDATE__VIEWPORT_DIMENSIONS {
    export let type = "UPDATE__VIEWPORT_DIME";
}

export interface UPDATE__VIEWPORT_DIMENSIONS {
    width: number
    height: number
}