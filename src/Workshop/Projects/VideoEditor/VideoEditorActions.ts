
/////////////////////////VIDEO UPLOAD/////////////////////////

export module VIDEO__UPLOAD__INIT {
    export const type = "VIDEO__UPLOAD__INIT";
}

export interface VIDEO__UPLOAD__INIT {
}

export module VIDEO__UPLOAD__SUCCESS {
    export const type = "VIDEO__UPLOAD__SUCCESS";
}

export interface VIDEO__UPLOAD__SUCCESS {
    videoPathId: string;
}

export module VIDEO__UPLOAD__FAILURE {
    export const type = "VIDEO__UPLOAD__FAILURE";
}

export interface VIDEO__UPLOAD__FAILURE {
    error: Object;
}

/////////////////////////VIDEO CONVERSION/////////////////////////

export module VIDEO__CONVERT__INIT {
    export const type = "VIDEO__CONVERT__INIT";
}

export interface VIDEO__CONVERT__INIT {
}

export module VIDEO__CONVERT__SUCCESS {
    export const type = "VIDEO__CONVERT__SUCCESS";
}

export interface VIDEO__CONVERT__SUCCESS {
    videoPathId: string;
}

export module VIDEO__CONVERT__FAILURE {
    export const type = "VIDEO__CONVERT__FAILURE";
}

export interface VIDEO__CONVERT__FAILURE {
    error: Object;
}