export type GetStatus = string;

export class AsyncGetStatus {
    static NONE:GetStatus = 'NONE';
    static FETCHING:GetStatus = 'FETCHING';
    static FETCHED:GetStatus = 'FETCHED';
    static ERROR:GetStatus = 'ERROR';
}

export interface AsyncGet<T> {
    status:GetStatus       // Get Status
    value?:T               // Data that were fetched
    error?:Object          // Error string returned from server or json object with validation errors
}

interface AsyncGetCallbacks<T> {
    none?:() => JSX.Element | JSX.Element[]
    fetching?:() => JSX.Element | JSX.Element[]
    fetched?:(value:T) => JSX.Element | JSX.Element[]
    error?:(error:Object)=> JSX.Element | JSX.Element[]
}

export module AsyncGet {

    export function init(value) {
        return {
            status: AsyncGetStatus.NONE,
            value: value
        }
    }

    /**
     * Helper method for rendering async get values
     * @param asyncGetValue        The async value to render
     * @param callbacks         Callbacks that render the view depending on the async value's status
     */
    export function render<T>(asyncGetValue:AsyncGet<T>, callbacks:AsyncGetCallbacks<T>): JSX.Element | JSX.Element[] {
        if (asyncGetValue.status == AsyncGetStatus.FETCHED && callbacks.fetched) {
            return callbacks.fetched(asyncGetValue.value);
        } else if (asyncGetValue.status == AsyncGetStatus.FETCHING && callbacks.fetching) {
            return callbacks.fetching();
        } else if (asyncGetValue.status == AsyncGetStatus.ERROR && callbacks.error) {
            return callbacks.error(asyncGetValue.error);
        } else {
            return callbacks.none ? callbacks.none() : null;
        }
    }

}
