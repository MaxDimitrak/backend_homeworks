import {postsRepository} from "../infrastructure/posts.repository";
import {PostQueryDtoInput} from "../routes/input/post-query-dto.input";
import {PostCreateDtoInput} from "../routes/input/post-create.dto-input";
import {PostUpdateDtoInput} from "../routes/input/post-update.dto-input";
import {postsQueryRepository} from "../infrastructure/posts.query.repository";
import {CreatePostForExactBlogInput} from "../../blogs/routes/input/create-post-for-exact-blog.dto.input";
import {PostDataPaginatedOutput} from "../routes/output/post-data-paginated.output";
import {PostDataOutput} from "../routes/output/post-data-output";

export const postsService = {
    async getManyPosts(query: PostQueryDtoInput): Promise<PostDataPaginatedOutput> {
        return await postsQueryRepository.getManyPosts(query);
    },
    async getPostById(id: string): Promise<PostDataOutput | null> {
        return await postsQueryRepository.getPostById(id)
    },
    async createPost(dto: PostCreateDtoInput): Promise<string> {
        return await postsRepository.createPost(dto);
    },
    async updatePostById(id: string, dto: PostUpdateDtoInput): Promise<boolean> {
        return await postsRepository.updatePostById(id, dto);
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id);
    },
    async getPostsByBlogId(blogId: string, query: PostQueryDtoInput): Promise<PostDataPaginatedOutput> {
        return await postsQueryRepository.getPostsByBlogId(blogId, query);
    },
    async createPostForExactBlog(blogId: string, dto: CreatePostForExactBlogInput): Promise<string | null> {
        return await postsRepository.createPostForExactBlog(blogId, dto)
    },
}