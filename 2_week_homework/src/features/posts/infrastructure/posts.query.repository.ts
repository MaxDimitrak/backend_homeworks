import {ObjectId, WithId} from "mongodb";
import {PostDBType} from "../domain/post";
import {postCollection} from "../../../db/mongo.db";
import {PostQueryDtoInput} from "../routes/input/post-query-dto.input";
import {PostDataPaginatedOutput} from "../routes/output/post-data-paginated.output";
import {mapToPostListPaginatedUtil} from "../routes/mappers/map-to-post-list-pagindted.util";
import {PostDataOutput} from "../routes/output/post-data-output";
import {mapToPost} from "../routes/mappers/map-to-post.util";

export const postsQueryRepository = {
    async getManyPosts(
        query: PostQueryDtoInput,
    ): Promise<PostDataPaginatedOutput> {
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
        return mapToPostListPaginatedUtil(items, {pageNumber, pageSize, totalCount});
    },
    async getPostById(id: string): Promise<PostDataOutput | null> {
        const foundedPost: WithId<PostDBType> | null = await postCollection.findOne({_id: new ObjectId(id)});
        if (!foundedPost) {
            return null;
        }
        return mapToPost(foundedPost);
    },

    async getPostsByBlogId(
        blogId: string,
        query: PostQueryDtoInput,
    ): Promise<PostDataPaginatedOutput> {
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
        return mapToPostListPaginatedUtil(items, {pageNumber, pageSize, totalCount});
    },
}