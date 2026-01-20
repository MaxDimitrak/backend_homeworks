import {BlogInputDto} from "../dto/blog.input_dto";
import {BlogDBType} from "../types/blog";
import {blogCollection} from "../../db/mongo.db";
import {DeleteResult, InsertOneResult, ObjectId, WithId} from "mongodb";



export const blogsRepository = {
    async getAllBlogs(): Promise<WithId<BlogDBType>[]>{
        return await blogCollection.find().toArray()
    },
    async getBlogById(id: string): Promise<WithId<BlogDBType> | null> {
        return await blogCollection.findOne({_id: new ObjectId(id)})
    },
    async createBlog(createBlogInput: BlogInputDto): Promise<WithId<BlogDBType>> {
        const newBlog: BlogDBType = {
            ...createBlogInput,
            createdAt: new Date(),
            isMembership: false,
        };
        const insertedBlog: InsertOneResult = await blogCollection.insertOne(newBlog)
        return {...newBlog, _id: insertedBlog.insertedId};
    },
    async updateBlogById(id: string, updateBlogInput: BlogInputDto): Promise<WithId<BlogDBType> | null> {
        return await blogCollection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {
                $set:
                    {
                        name: updateBlogInput.name,
                        description: updateBlogInput.description,
                        websiteUrl: updateBlogInput.websiteUrl,
                    }
            },
            {returnDocument: 'after'}
        );
    },
    async deleteBlogById(id: string): Promise<boolean> {
        const deletedBlog: DeleteResult = await blogCollection.deleteOne({_id: new ObjectId(id)});
        return deletedBlog.deletedCount === 1;
    },
}