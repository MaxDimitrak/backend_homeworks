import {ObjectId, WithId} from "mongodb";
import {PostDBType} from "../domain/post";
import {postCollection} from "../../../db/mongo.db";
import {PostQueryDtoInput} from "../routes/input/post_query_dto.input";
import {PostPaginatedDataOutput} from "../routes/output/post_paginated_data.output";
import {mapToPostPaginatedListUtil} from "../routes/mappers/map_to_post_paginated_list.util";
import {PostDataOutput} from "../routes/output/post_data.output";
import {mapToPostUtil} from "../routes/mappers/map_to_post.util";

export const postsQueryRepository = {
    async getManyPosts(
        query: PostQueryDtoInput,
    ): Promise<PostPaginatedDataOutput> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        }: PostQueryDtoInput = query;
        const skip: number = (pageNumber - 1) * pageSize;
        const items: WithId<PostDBType>[] = await postCollection
            .find()
            .sort({[sortBy]: sortDirection === 'desc' ? -1 : 1,})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount: number = await postCollection.countDocuments();
        return mapToPostPaginatedListUtil(items, {pageNumber, pageSize, totalCount});
    },
    async getPostById(id: string): Promise<PostDataOutput | null> {
        const foundedPost: WithId<PostDBType> | null = await postCollection.findOne({_id: new ObjectId(id)});
        if (!foundedPost) {
            return null;
        }
        return mapToPostUtil(foundedPost);
    },

    async getPostsByBlogId(
        blogId: string,
        query: PostQueryDtoInput,
    ): Promise<PostPaginatedDataOutput> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        }: PostQueryDtoInput = query;

        const skip: number = (pageNumber - 1) * pageSize;
        const totalCount: number = await postCollection.countDocuments({blogId: blogId});
        const items: WithId<PostDBType>[] = await postCollection
            .find({blogId: blogId})
            .sort({[sortBy]: sortDirection === 'desc' ? -1 : 1})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return mapToPostPaginatedListUtil(items, {pageNumber, pageSize, totalCount});
    },
}