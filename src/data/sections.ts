import { ISection } from '../models';
import { blogPosts } from './blog/blogPosts';
import { workPosts } from './work/workPosts';

export const sections: ISection[] = [
    {
        heading: "BLOG",
        link: "blog",
        posts: blogPosts
    },
    {
        heading: "WORK",
        link: "work",
        posts: workPosts
    }
];
