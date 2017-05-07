
/////////////////////////IMAGE UPLOAD/////////////////////////

export module IMAGE__UPLOAD__INIT {
    export const type = "IMAGE__UPLOAD__INIT";
}

export interface IMAGE__UPLOAD__INIT {
}

export module IMAGE__UPLOAD__SUCCESS {
    export const type = "IMAGE__UPLOAD__SUCCESS";
}

export interface IMAGE__UPLOAD__SUCCESS {
    imagePathId: string;
}

export module IMAGE__UPLOAD__FAILURE {
    export const type = "IMAGE__UPLOAD__FAILURE";
}

export interface IMAGE__UPLOAD__FAILURE {
    error: Object;
}
