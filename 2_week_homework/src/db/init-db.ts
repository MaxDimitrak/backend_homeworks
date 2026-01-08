import {Blog} from "../blogs/types/blog";
import {Post} from "../posts/types/post";

export const db = {
    blogs: <Blog[]>[
        {
            id: '1',
            name: 'Blog 1',
            description: 'Blog Description 1',
            websiteUrl: 'https://www.test.com/blog1',
        },
        {
            id: '2',
            name: 'Blog 2',
            description: 'Blog Description 2',
            websiteUrl: 'https://www.test.com/blog2',
        },
        {
            id: '3',
            name: 'Blog 3',
            description: 'Blog Description 3',
            websiteUrl: 'https://www.test.com/blog3',
        },
    ],
    posts: <Post[]>[
        {
            id: "1",
            title: "The Future of AI in 2026",
            shortDescription: "Exploring the latest trends in artificial intelligence.",
            content: "Artificial intelligence has evolved rapidly over the last year...",
            blogId: "123",
            blogName: "Tech Insights"
        },
        {
            id: "2",
            title: "Mastering TypeScript Types",
            shortDescription: "A deep dive into advanced type system features.",
            content: "Generics and mapped types allow for powerful abstractions...",
            blogId: "456",
            blogName: "Fullstack Mastery"
        },
        {
            id: "3",
            title: "Healthy Habits for Remote Workers",
            shortDescription: "How to maintain work-life balance while working from home.",
            content: "Setting boundaries and taking regular breaks is essential for productivity...",
            blogId: "789",
            blogName: "Modern Living"
        }

    ],
};