import {postsRepository} from "../infrastructure/posts.repository";
import {PostQueryDtoInput} from "../routes/input/post_query_dto.input";
import {Post_create_dtoInput} from "../routes/input/post_create_dto.input";
import {Post_update_dtoInput} from "../routes/input/post_update_dto.input";
import {postsQueryRepository} from "../infrastructure/posts.query.repository";
import {CreatePostForExactBlogInput} from "../../blogs/routes/input/post_create_for_exact_blog.dto.input";
import {PostPaginatedDataOutput} from "../routes/output/post_paginated_data.output";
import {PostDataOutput} from "../routes/output/post_data.output";

export const postsService = {
    async getManyPosts(query: PostQueryDtoInput): Promise<PostPaginatedDataOutput> {
        return await postsQueryRepository.getManyPosts(query);
    },
    async getPostById(id: string): Promise<PostDataOutput | null> {
        return await postsQueryRepository.getPostById(id)
    },
    async createPost(dto: Post_create_dtoInput): Promise<string> {
        return await postsRepository.createPost(dto);
    },
    async updatePostById(id: string, dto: Post_update_dtoInput): Promise<boolean> {
        return await postsRepository.updatePostById(id, dto);
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id);
    },
    async getPostsByBlogId(blogId: string, query: PostQueryDtoInput): Promise<PostPaginatedDataOutput> {
        return await postsQueryRepository.getPostsByBlogId(blogId, query);
    },
    async createPostForExactBlog(blogId: string, dto: CreatePostForExactBlogInput): Promise<string | null> {
        return await postsRepository.createPostForExactBlog(blogId, dto)
    },
}