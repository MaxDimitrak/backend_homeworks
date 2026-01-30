import {Request, Response} from 'express';
import {http_response} from "../../../../core/types/http_responses";
import {PostQueryDtoInput} from "../input/post-query-dto.input";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../../core/helpers/set-default-pagination-and-sort-if-not-exist.helper";
import {PostDataPaginatedOutput} from "../output/post-data-paginated.output";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.service";

export async function getManyPostsHandler(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const query: PostQueryDtoInput = setDefaultPaginationAndSortIfNotExist(req.query);
        const data: PostDataPaginatedOutput = await postsService.getManyPosts(query);
        res.status(http_response.ok).send(data);
    } catch (err) {
        errorHandler(err, res);
    }
}