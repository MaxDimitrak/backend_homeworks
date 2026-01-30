import {BlogQueryDto} from "../routes/input/blog-query-dto.input";
import {blogsRepository} from "../infrastructure/blogs.repository";
import {BlogCreateDtoInput} from "../routes/input/blog-create-dto.input";
import {BlogUpdateDtoInput} from "../routes/input/blog-update-dto.input";
import {blogsQueryRepository} from "../infrastructure/blogs.query.repository";
import {BlogDataPaginatedOutput} from "../routes/output/blog-data-paginated.output";
import {BlogDataOutput} from "../routes/output/blog-data-output";

export const blogsService = {
    async getManyBlogs(queryDto: BlogQueryDto): Promise<BlogDataPaginatedOutput> {
        return await blogsQueryRepository.getManyBlogs(queryDto)
    },
    async getBlogById(id: string): Promise<BlogDataOutput | null> {
        return await blogsQueryRepository.getBlogById(id);
    },
    async createBlog(dto: BlogCreateDtoInput): Promise<string> {
        return await blogsRepository.createBlog(dto)
    },
    async updateBlogById(id: string, dto: BlogUpdateDtoInput): Promise<boolean> {
        return await blogsRepository.updateBlogById(id, dto)
    },
    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },
}