export interface IDictionary<T> {
    [key: string]: T
}

export interface IPost {
    name: string
    category: string
    link: string
    status: string
    date: string
    content: any[]
    parts?: string[]
    image: string
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
    category: string
    path: string
    viewPaths: string[]
    parts?: string[] | JSX.Element[]
    component: JSX.Element
    slides: string[]
    image: string
}

export interface IShowroomLink {
    name: string
    category: string
    path: string
    parts?: string[]
    image: string
}
