import {Request, Response} from 'express';
import {http_response} from "../../../../core/types/http_responses";
import {BlogQueryDto} from "../input/blog_query_dto.input";
import {blogsService} from "../../application/blogs.servise";
import {BlogPaginatedDataOutput} from "../output/blog_paginated_data.output";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../../core/helpers/set_default_pagination_and_sort_if_not_exist.helper";
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
        const data: BlogPaginatedDataOutput = await blogsService.getManyBlogs(query);
        res.status(http_response.ok).send(data);
    } catch (err) {
        errorHandler(err, res)
    }

}