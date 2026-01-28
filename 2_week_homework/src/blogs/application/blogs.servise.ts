import {WithId} from "mongodb";
import {BlogDBType} from "../domain/blog";
import {BlogQueryDto} from "../routes/input/blog-query-dto.input";
import {blogsRepository} from "../repositories/blogs.repository";
import {BlogCreateDtoInput} from "../routes/input/blog-create-dto.input";
import {BlogUpdateDtoInput} from "../routes/input/blog-update-dto.input";
import {PostDBType} from "../../posts/domain/post";
import {PostCreateDtoInput} from "../../posts/routes/input/post-create.dto-input";
import {CreatePostForExactBlogInput} from "../routes/input/create-post-for-exact-blog.dto.input";

export const blogsService = {
    async getManyBlogs(queryDto: BlogQueryDto): Promise<{ items: WithId<BlogDBType>[], totalCount: number }> {
        return await blogsRepository.getManyBlogs(queryDto)
    },
    async getBlogById(id: string): Promise<WithId<BlogDBType> | null> {
        return await blogsRepository.getBlogByIdOrFail(id);
    },
    async createBlog(dto: BlogCreateDtoInput): Promise<WithId<BlogDBType>> {
        return await blogsRepository.createBlog(dto)
    },
    async updateBlogById(id: string, dto: BlogUpdateDtoInput): Promise<WithId<BlogDBType> | null> {
        return await blogsRepository.updateBlogById(id, dto)
    },
    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },
    async createPostForExactBlog(blogId: string, dto: CreatePostForExactBlogInput): Promise<WithId<PostDBType> | null> {
        return await blogsRepository.createPostForExactBlog(blogId, dto)
    }
}