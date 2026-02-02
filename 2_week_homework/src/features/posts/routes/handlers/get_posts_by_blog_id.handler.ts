import {Request, Response} from "express";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {PostQueryDtoInput} from "../input/post_query_dto.input";
import {matchedData} from "express-validator";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../../core/helpers/set_default_pagination_and_sort_if_not_exist.helper";
import {postsService} from "../../application/posts.service";
import {http_response} from "../../../../core/types/http_responses";
import {PostPaginatedDataOutput} from "../output/post_paginated_data.output";

export async function getPostsByBlogIdHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.blogId;
        const sanitizedQuery: PostQueryDtoInput = matchedData(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const query: PostQueryDtoInput = setDefaultPaginationAndSortIfNotExist(sanitizedQuery);
        const viewModel: PostPaginatedDataOutput = await postsService.getPostsByBlogId(id, query);
        if (viewModel.items.length === 0) {
            res.sendStatus(http_response.not_found)
            return;
        }
        res.status(http_response.ok).send(viewModel);
    } catch (err) {
        errorHandler(err, res);
    }
}