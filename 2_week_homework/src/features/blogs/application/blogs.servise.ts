import {BlogQueryDto} from "../routes/input/blog_query_dto.input";
import {blogsRepository} from "../infrastructure/blogs.repository";
import {Blog_create_dtoInput} from "../routes/input/blog_create_dto.input";
import {Blog_update_dtoInput} from "../routes/input/blog_update_dto.input";
import {blogsQueryRepository} from "../infrastructure/blogs.query.repository";
import {BlogPaginatedDataOutput} from "../routes/output/blog_paginated_data.output";
import {Blog_dataOutput} from "../routes/output/blog_data.output";

export const blogsService = {
    async getManyBlogs(queryDto: BlogQueryDto): Promise<BlogPaginatedDataOutput> {
        return await blogsQueryRepository.getManyBlogs(queryDto)
    },
    async getBlogById(id: string): Promise<Blog_dataOutput | null> {
        return await blogsQueryRepository.getBlogById(id);
    },
    async createBlog(dto: Blog_create_dtoInput): Promise<string> {
        return await blogsRepository.createBlog(dto)
    },
    async updateBlogById(id: string, dto: Blog_update_dtoInput): Promise<boolean> {
        return await blogsRepository.updateBlogById(id, dto)
    },
    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },
}