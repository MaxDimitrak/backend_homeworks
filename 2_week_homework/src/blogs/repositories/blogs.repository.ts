import {blogCollection} from "../../db/mongo.db";
import {DeleteResult, InsertOneResult, ObjectId, WithId} from "mongodb";
import {BlogDBType} from "../domain/blog";
import {BlogQueryDto, FilterFields} from "../routes/input/blog-query-dto.input";
import {BlogCreateDtoInput} from "../routes/input/blog-create-dto.input";
import {BlogUpdateDtoInput} from "../routes/input/blog-update-dto.input";


export const blogsRepository = {
    async getManyBlogs(queryDto: BlogQueryDto): Promise<{ items: WithId<BlogDBType>[], totalCount: number }> {
        const {
            searchNameTerm,
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
        }: BlogQueryDto = queryDto;
        const filter: FilterFields = {};
        if (searchNameTerm) {
            filter.name = {$regex: searchNameTerm, $options: 'i'};
        }
        const totalCount: number = await blogCollection.countDocuments()
        const skip: number = (pageNumber - 1) * pageSize;
        const items: WithId<BlogDBType>[] = await blogCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray()
        return {items, totalCount}
    },
    async getBlogByIdOrFail(id: string): Promise<WithId<BlogDBType> | null> {
        return await blogCollection.findOne({_id: new ObjectId(id)})
    },
    async createBlog(createBlogInput: BlogCreateDtoInput): Promise<WithId<BlogDBType>> {
        const newBlog: BlogDBType = {
            ...createBlogInput,
            createdAt: new Date(),
            isMembership: false,
        };
        const insertedBlog: InsertOneResult = await blogCollection.insertOne(newBlog)
        return {...newBlog, _id: insertedBlog.insertedId};
    },
    async updateBlogById(id: string, updateBlogInput: BlogUpdateDtoInput): Promise<WithId<BlogDBType> | null> {
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