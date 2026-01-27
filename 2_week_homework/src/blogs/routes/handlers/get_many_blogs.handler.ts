import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {BlogDBType} from "../../domain/blog";
import {BlogQueryDto} from "../input/blog-query-dto.input";
import {blogsService} from "../../application/blogs.servise";
import {mapToBlogListPaginatedUtil} from "../mappers/map-to-blog-list-paginated.util";
import {BlogDataPaginatedOutput} from "../output/blog-data-paginated.output";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../core/helpers/set-default-pagination-and-sort-if-not-exist.helper";
import {matchedData} from "express-validator";
import {errorHandler} from "../../../core/errors/errors.handler";


export const getManyBlogsHandler = async (
    req: Request,
    res: Response): Promise<void> => {
    try{

        const sanitizedQuery: BlogQueryDto = matchedData<BlogQueryDto>(req, {
            locations: ['query'],
            includeOptionals: true,
        })

        const query: BlogQueryDto = setDefaultPaginationAndSortIfNotExist(sanitizedQuery);
        const data: { items: WithId<BlogDBType>[], totalCount: number } = await blogsService.getManyBlogs(query);
        const viewModel: BlogDataPaginatedOutput = mapToBlogListPaginatedUtil(
            data.items, {
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: data.totalCount
            })
        res.status(http_response.ok).send(viewModel);
    }catch(err){
        errorHandler(err, res)
    }

}