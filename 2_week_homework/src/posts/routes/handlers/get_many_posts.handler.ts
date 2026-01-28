import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {PostDBType} from "../../domain/post";
import {PostQueryDtoInput} from "../input/post-query-dto.input";
import {matchedData} from "express-validator";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../core/helpers/set-default-pagination-and-sort-if-not-exist.helper";
import {PostDataPaginatedOutput} from "../output/post-data-paginated.output";
import {mapToPostListPaginatedUtil} from "../mappers/map-to-post-list-pagindted.util";
import {errorHandler} from "../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.service";

export async function getManyPostsHandler (
    req: Request,
    res: Response
): Promise<void>{
    try{
        const query: PostQueryDtoInput = setDefaultPaginationAndSortIfNotExist(req.query);
        const data: {items: WithId<PostDBType>[],totalCount: number} = await postsService.getManyPosts(query);
        const viewModel: PostDataPaginatedOutput = mapToPostListPaginatedUtil(
            data.items,{
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: data.totalCount
            }
        )
        console.log(query)
        res.status(http_response.ok).send(viewModel);
    }catch(err){
        errorHandler(err, res);
    }

}