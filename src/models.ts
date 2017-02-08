export interface IDictionary<T> {
    [key: string]: T
}

export interface ISection {
    heading: string
    link: string
    posts: IPost[]
}

export interface IPost {
    heading: string
    date: string
    content: string[]
    pic: string
}