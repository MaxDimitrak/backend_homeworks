import {Post} from "../posts/types/post";

export const db = {
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