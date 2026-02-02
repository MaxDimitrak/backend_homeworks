import {Request, Response} from 'express';
import {http_response} from "../../../../core/types/http_responses";
import {PostQueryDtoInput} from "../input/post_query_dto.input";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../../core/helpers/set_default_pagination_and_sort_if_not_exist.helper";
import {PostPaginatedDataOutput} from "../output/post_paginated_data.output";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.service";
import {PostSortFields} from "../input/post_sort_fields";

export async function getManyPostsHandler(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const query: PostQueryDtoInput = setDefaultPaginationAndSortIfNotExist<PostSortFields>(req.query);
        const data: PostPaginatedDataOutput = await postsService.getManyPosts(query);
        res.status(http_response.ok).send(data);
    } catch (err) {
        errorHandler(err, res);
    }
}