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
    link: string
    status: string
    date: string
    content: any[]
    pic: string
}