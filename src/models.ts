export interface IDictionary<T> {
    [key: string]: T
}

export interface IStats {
    name: string,
    age: number,
    gender: string,
    location: string
}

export interface IColumns {
    heading: string,
    pic: string,
    isSortReversed: boolean,
    sortFunction: (any) => any
}

export interface IFilters {
    heading: string;
    active: boolean;
    filterFunction: (IStats) => boolean;
}
