export interface IDictionary<T> {
    [key: string]: T
}

export interface IArtistSimple {
    name: string
}

export interface IAlbum {
    name: string
    album_type: string
    artists: IArtistSimple[]
}

export interface IPagingObject {
    items: IAlbum[]
    limit: number
}

export interface IStats {
    albums: IPagingObject,
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


