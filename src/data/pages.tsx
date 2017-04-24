import { IPage } from '../models';
import { blogPosts } from './blog/blogPosts';
import { workPosts } from './work/workPosts';

export const pages: IPage[] = [
    {
        name: "BLOG",
        path: "blog-posts",
        componentType: "post",
        viewLinks: blogPosts.map(post => post.heading.replace(/\s/g, "-").toLowerCase()),
        posts: blogPosts
    },
    {
        name: "WORK",
        path: "work",
        componentType: "post",
        viewLinks: workPosts.map(post => post.heading.replace(/\s/g, "-").toLowerCase()),
        posts: workPosts
    },
    {
        name: "VLOG",
        path: "slideshow",
        componentType: "slideshow",
        viewLinks: blogPosts.map(post => post.heading.replace(/\s/g, "-").toLowerCase()),
        posts: blogPosts
    }
];
