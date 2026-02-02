import {Request, Response} from "express";
import {http_response} from "../../../../core/types/http_responses";
import {Post_create_dtoInput} from "../input/post_create_dto.input";
import {postsService} from "../../application/posts.service";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {PostDataOutput} from "../output/post_data.output";
import {postsQueryRepository} from "../../infrastructure/posts.query.repository";


export async function createPostHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const body: Post_create_dtoInput = req.body;
        const createdPostId: string = await postsService.createPost(body);
        const createdPost: PostDataOutput | null = await postsQueryRepository.getPostById(createdPostId);
        if (!createdPost) {
            res.sendStatus(http_response.internal_server_error)
            return;
        }
        res.status(http_response.created).send(createdPost);
    } catch (err) {
        errorHandler(err, res);
    }

}