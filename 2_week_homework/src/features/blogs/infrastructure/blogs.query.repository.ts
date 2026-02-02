import {BlogQueryDto, FilterFields} from "../routes/input/blog_query_dto.input";
import {ObjectId, WithId} from "mongodb";
import {BlogDBType} from "../domain/blog";
import {blogCollection} from "../../../db/mongo.db";
import {BlogPaginatedDataOutput} from "../routes/output/blog_paginated_data.output";
import {mapToBlogPaginatedListUtil} from "../routes/mappers/map_to_blog_paginated_list.util";
import {blogMapper} from "../routes/mappers/map_to_blog.util";
import {Blog_dataOutput} from "../routes/output/blog_data.output";

export const blogsQueryRepository = {
    async getManyBlogs(queryDto: BlogQueryDto): Promise<BlogPaginatedDataOutput> {
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
        const totalCount: number = await blogCollection.countDocuments(filter)
        const skip: number = (pageNumber - 1) * pageSize;
        const items: WithId<BlogDBType>[] = await blogCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray()
        return mapToBlogPaginatedListUtil(items, {pageNumber, pageSize, totalCount});
    },
    async getBlogById(id: string): Promise<Blog_dataOutput | null> {
        const foundBlog: WithId<BlogDBType> | null = await blogCollection.findOne({_id: new ObjectId(id)});
        if (!foundBlog) {
            return null;
        }
        return blogMapper(foundBlog)
    },
}