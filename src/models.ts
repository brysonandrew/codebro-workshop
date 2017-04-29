export interface IDictionary<T> {
    [key: string]: T
}

export interface IPost {
    heading: string
    link: string
    status: string
    date: string
    content: any[]
    slides?: any[]
    pic: string
}

export interface IPage {
    name: string
    path: string
    componentType: string
    viewLinks: any[]
    posts: IPost[]
}

export interface IBar {
    heading: string
    quantity: number
}

export interface IComponentType {
    handle: string
    component: JSX.Element
}

export interface IHomeParams {
    activePage: string
    activeView: string
}

export interface IWorkshopLink {
    name: string
    path: string
}
