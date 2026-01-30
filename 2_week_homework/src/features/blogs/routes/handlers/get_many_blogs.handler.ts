import {Request, Response} from 'express';
import {http_response} from "../../../../core/types/http_responses";
import {BlogQueryDto} from "../input/blog-query-dto.input";
import {blogsService} from "../../application/blogs.servise";
import {BlogDataPaginatedOutput} from "../output/blog-data-paginated.output";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../../core/helpers/set-default-pagination-and-sort-if-not-exist.helper";
import {matchedData} from "express-validator";
import {errorHandler} from "../../../../core/errors/errors.handler";


export async function getManyBlogsHandler(
    req: Request,
    res: Response): Promise<void> {
    try {

        const sanitizedQuery: BlogQueryDto = matchedData<BlogQueryDto>(req, {
            locations: ['query'],
            includeOptionals: true,
        })

        const query: BlogQueryDto = setDefaultPaginationAndSortIfNotExist(sanitizedQuery);
        query.searchNameTerm = sanitizedQuery.searchNameTerm
        const data: BlogDataPaginatedOutput = await blogsService.getManyBlogs(query);
        res.status(http_response.ok).send(data);
    } catch (err) {
        errorHandler(err, res)
    }

}