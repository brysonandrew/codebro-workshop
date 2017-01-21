export type PostStatus = string;

export interface AsyncPost<S, R> {
    status:PostStatus       // Post status
    data?:S                  // Data to be sent to the server
    responseData?:R         // Response data (usually in json format)
    error?:Object           // Error object returned from server (might include validation errors)
}

export class AsyncPostStatus {
    static NONE:PostStatus = 'NONE';
    static POSTING:PostStatus = 'POSTING';
    static POSTED:PostStatus = 'POSTED';
    static ERROR:PostStatus = 'ERROR';
}

export interface AsyncPostValueCallbacks<T> {
    none?:() => JSX.Element
    posting?:() => JSX.Element
    posted?:(value:T) => JSX.Element
    error?:(error:Object) => JSX.Element
}

export module AsyncPost {

    export function init(value) {
        return {
            status: AsyncPostStatus.NONE,
            data: value
        }
    }

    /**
     * Helper method for rendering async post values
     * @param asyncPostValue    The async post value to render
     * @param callbacks         Callbacks that render the view depending on the async value's status
     */
    export function render<T>(asyncPostValue:AsyncPost<T, any>, callbacks:AsyncPostValueCallbacks<T>):JSX.Element {
        if (asyncPostValue.status == AsyncPostStatus.POSTED && callbacks.posted) {
            return callbacks.posted(asyncPostValue.data);
        } else if (asyncPostValue.status == AsyncPostStatus.POSTING && callbacks.posting) {
            return callbacks.posting();
        } else if (asyncPostValue.status == AsyncPostStatus.ERROR && callbacks.error) {
            return callbacks.error(asyncPostValue.error);
        } else {
            return callbacks.none ? callbacks.none() : null;
        }
    }
}
