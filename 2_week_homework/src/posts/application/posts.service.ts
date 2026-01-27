import {WithId} from "mongodb";
import {PostDBType} from "../domain/post";
import {postsRepository} from "../repositories/posts.repository";
import {PostQueryDtoInput} from "../routes/input/post-query-dto.input";
import {PostCreateDtoInput} from "../routes/input/post-create.dto-input";
import {PostUpdateDtoInput} from "../routes/input/post-update.dto-input";

export const postsService = {
    async getManyPosts(query: PostQueryDtoInput): Promise<{ items: WithId<PostDBType>[], totalCount: number }> {
        return await postsRepository.getManyPosts(query);
    },
    async getPostById(id: string): Promise<WithId<PostDBType> | null> {
        return await postsRepository.getPostById(id)
    },
    async createPost(dto: PostCreateDtoInput): Promise<WithId<PostDBType>> {
        return await postsRepository.createPost(dto);
    },
    async updatePostById(id: string, dto: PostUpdateDtoInput): Promise<WithId<PostDBType> | null> {
        return await postsRepository.updatePostById(id, dto);
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id);
    },
    async getPostsByBlogId(blogId: string, query: PostQueryDtoInput): Promise<{ items: WithId<PostDBType>[], totalCount: number }> {
        return await postsRepository.getPostsByBlogId(blogId, query);
    }
}