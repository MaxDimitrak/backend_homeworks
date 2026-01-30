import {blogCollection} from "../../../db/mongo.db";
import {DeleteResult, InsertOneResult, ObjectId, UpdateResult} from "mongodb";
import {BlogDBType} from "../domain/blog";
import {BlogCreateDtoInput} from "../routes/input/blog-create-dto.input";
import {BlogUpdateDtoInput} from "../routes/input/blog-update-dto.input";


export const blogsRepository = {
    async createBlog(createBlogInput: BlogCreateDtoInput): Promise<string> {
        const newBlog: BlogDBType = {
            ...createBlogInput,
            createdAt: new Date(),
            isMembership: false,
        };
        const insertedBlogId: InsertOneResult<BlogDBType> = await blogCollection.insertOne(newBlog)
        return insertedBlogId.insertedId.toString();
    },

    async updateBlogById(id: string, updateBlogInput: BlogUpdateDtoInput): Promise<boolean> {
        const updatedBlog: UpdateResult<BlogDBType> = await blogCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set:
                    {
                        name: updateBlogInput.name,
                        description: updateBlogInput.description,
                        websiteUrl: updateBlogInput.websiteUrl,
                    }
            },
        );
        return updatedBlog.matchedCount === 1;
    },
    async deleteBlogById(id: string): Promise<boolean> {
        const deletedBlog: DeleteResult = await blogCollection.deleteOne({_id: new ObjectId(id)});
        return deletedBlog.deletedCount === 1;
    },
}