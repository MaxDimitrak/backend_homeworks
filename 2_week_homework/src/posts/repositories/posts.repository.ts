import {postCollection} from "../../db/mongo.db";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {PostDBType} from "../domain/post";
import {PostCreateDtoInput} from "../routes/input/post-create.dto-input";
import {PostQueryDtoInput} from "../routes/input/post-query-dto.input";


export const postsRepository = {
    async getManyPosts(
        query: PostQueryDtoInput,
    ): Promise<{ items: WithId<PostDBType>[], totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        }: PostQueryDtoInput = query;
        const skip: number = (pageNumber - 1) * pageSize;
        const items: WithId<PostDBType>[] = await postCollection
            .find()
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .toArray();

        const totalCount: number = await postCollection.countDocuments();
        return {items, totalCount};
    },
    async getPostById(id: string): Promise<WithId<PostDBType> | null> {
        return await postCollection.findOne({_id: new ObjectId(id)});
    },

    async getPostsByBlogId(
        blogId: string,
        query: PostQueryDtoInput,
    ): Promise<{ items: WithId<PostDBType>[], totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        }: PostQueryDtoInput = query;

        const skip: number = (pageNumber - 1) * pageSize;
        const totalCount: number = await postCollection.countDocuments();
        const items: WithId<PostDBType>[] = await postCollection
            .find({blogId: blogId})
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .toArray();
        return {items, totalCount};
    },
    async createPost(createPostInput: PostCreateDtoInput): Promise<WithId<PostDBType>> {
        const newPost: PostDBType = {
            ...createPostInput,
            blogName: 'asterix',
            createdAt: new Date(),
        }
        const insertedPost: InsertOneResult = await postCollection.insertOne(newPost);
        return {...newPost, _id: insertedPost.insertedId};
    },
    async updatePostById(id: string, updatePostInput: PostCreateDtoInput): Promise<WithId<PostDBType> | null> {
        return await postCollection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {
                $set:
                    {
                        title: updatePostInput.title,
                        shortDescription: updatePostInput.shortDescription,
                        content: updatePostInput.content,
                        blogId: updatePostInput.blogId,
                    }
            },
            {returnDocument: 'after'}
        )
    },
    async deletePostById(id: string): Promise<boolean> {
        const deletedPost = await postCollection.deleteOne({_id: new ObjectId(id)});
        return deletedPost.deletedCount === 1
    },
}