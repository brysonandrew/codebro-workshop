export interface IDictionary<T> {
    [key: string]: T
}

export interface IPost {
    heading: string
    link: string
    status: string
    date: string
    content: any[]
    pic: string
}

export interface IPage {
    name: string
    link: string
    viewLinks: any[]
    posts: IPost[]
}