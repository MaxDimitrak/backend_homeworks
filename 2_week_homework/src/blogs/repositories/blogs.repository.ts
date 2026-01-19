import {BlogInputDto} from "../dto/blog.input_dto";
import {BlogBDType, BlogViewModel} from "../types/blog";
import {blogCollection} from "../../db/mongo.db";
import {DeleteResult, InsertOneResult, ObjectId, WithId} from "mongodb";
import {blogMapper} from "../routes/handlers/blogMapper.handler";


export const blogsRepository = {
    async getAllBlogs(): Promise<WithId<BlogBDType>[]>{
        return await blogCollection.find().toArray()
    },
    async getBlogById(id: string): Promise<WithId<BlogBDType> | null> {
        return await blogCollection.findOne({_id: new ObjectId(id)})
    },
    async createBlog(createBlogInput: BlogInputDto): Promise<BlogViewModel> {
        const newBlog: BlogBDType = {
            ...createBlogInput,
            createdAt: new Date(),
            isMembership: false,
        };
        const insertedBlog: InsertOneResult = await blogCollection.insertOne(newBlog)
        return blogMapper({...newBlog, _id: insertedBlog.insertedId});
    },
    async updateBlogById(id: string, updateBlogInput: BlogInputDto): Promise<WithId<BlogBDType> | null> {
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
    async deleteBlogById(id: string): Promise<void> {
        const deletedBlog: DeleteResult = await blogCollection.deleteOne({_id: new ObjectId(id)});
        if (!deletedBlog.deletedCount) {
            throw new Error("Blog not found.");
        }
        return;
    },
}