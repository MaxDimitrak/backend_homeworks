import {PostDBType} from "../types/post";
import {PostInputDto} from "../dto/post.input_dto";
import {postCollection} from "../../db/mongo.db";
import {InsertOneResult, ObjectId, WithId} from "mongodb";


export const postsRepository = {
    async getAllPosts(): Promise<WithId<PostDBType>[]> {
        return await postCollection.find().toArray();
    },
    async getPostById(id: string): Promise<WithId<PostDBType> | null> {
        return await postCollection.findOne({_id: new ObjectId(id)});
    },
    async createPost(createPostInput: PostInputDto): Promise<WithId<PostDBType>> {
        const newPost: PostDBType = {
            ...createPostInput,
            blogName: 'asterix',
            createdAt: new Date(),
        }
        const insertedPost: InsertOneResult = await postCollection.insertOne(newPost);
        return {...newPost, _id: insertedPost.insertedId};
    },
    async updatePostById(id: string, updatePostInput: PostInputDto): Promise<WithId<PostDBType> | null> {
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