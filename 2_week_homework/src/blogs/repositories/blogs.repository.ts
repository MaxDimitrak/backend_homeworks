import {db} from "../../db/init-db";
import {BlogInputDto} from "../dto/blog.input_dto";
import {Blog} from "../types/blog";


export const blogsRepository = {
    getAllBlogs(): Blog[] {
        return db.blogs
    },
    getBlogById(id: string): Blog | undefined {
        return db.blogs.find(b => b.id === id)
    },
    createBlog(createBlogInput: BlogInputDto): Blog {
        const newBlog: Blog = {
            ...createBlogInput,
            id: db.blogs.length ? String(db.blogs[db.blogs.length - 1].id + 1) : '1',
        }
        db.blogs.push(newBlog)
        return newBlog;
    },
    updateBlogById(id: string, updateBlogInput: BlogInputDto): void | undefined {
        const foundBlog: Blog = db.blogs.find(b => b.id === id) as Blog;
        foundBlog.name = updateBlogInput.name;
        foundBlog.description = updateBlogInput.description;
        foundBlog.websiteUrl = updateBlogInput.websiteUrl;
    },
    deleteBlogById(index: number): void {
        db.blogs.splice(index, 1);
    },
    findBlogIndex(id: string) {
        return db.blogs.findIndex(blog => blog.id === id);
    }
}