import {Request, Response} from "express";
import {errorHandler} from "../../../core/errors/errors.handler";
import {PostQueryDtoInput} from "../input/post-query-dto.input";
import {matchedData} from "express-validator";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../core/helpers/set-default-pagination-and-sort-if-not-exist.helper";
import {postsService} from "../../application/posts.service";
import {WithId} from "mongodb";
import {PostDBType} from "../../domain/post";
import {http_response} from "../../../core/types/http_responses";
import {mapToPostListPaginatedUtil} from "../mappers/map-to-post-list-pagindted.util";

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
        const viewModel: {
            items: WithId<PostDBType>[],
            totalCount: number
        } = await postsService.getPostsByBlogId(id, query);
        if (viewModel.items.length === 0) {
            res.sendStatus(http_response.not_found)
            return;
        }
        res.status(http_response.ok).send(
            mapToPostListPaginatedUtil(
                viewModel.items,
                {
                    pageNumber: query.pageNumber,
                    pageSize: query.pageSize,
                    totalCount: viewModel.totalCount
                }
            )
        );
    } catch (err) {
        errorHandler(err, res);
    }
}