import {BlogQueryDto, FilterFields} from "../routes/input/blog-query-dto.input";
import {ObjectId, WithId} from "mongodb";
import {BlogDBType} from "../domain/blog";
import {blogCollection} from "../../../db/mongo.db";
import {BlogDataPaginatedOutput} from "../routes/output/blog-data-paginated.output";
import {mapToBlogListPaginatedUtil} from "../routes/mappers/map-to-blog-list-paginated.util";
import {blogMapper} from "../routes/mappers/map-to-blog.util";
import {BlogDataOutput} from "../routes/output/blog-data-output";

export const blogsQueryRepository = {
    async getManyBlogs(queryDto: BlogQueryDto): Promise<BlogDataPaginatedOutput> {
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
            .sort({[sortBy]: sortDirection === 'desc' ? -1 : 1})
            .skip(skip)
            .limit(pageSize)
            .toArray()
        return mapToBlogListPaginatedUtil(items, {pageNumber, pageSize, totalCount});
    },
    async getBlogById(id: string): Promise<BlogDataOutput | null> {
        const foundBlog: WithId<BlogDBType> | null = await blogCollection.findOne({_id: new ObjectId(id)});
        if (!foundBlog) {
            return null;
        }
        return blogMapper(foundBlog)
    },
}