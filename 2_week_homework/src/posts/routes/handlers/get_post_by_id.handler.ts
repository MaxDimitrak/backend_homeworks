import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {PostDBType} from "../../domain/post";
import {mapToPost} from "../mappers/map-to-post.util";
import {errorHandler} from "../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.service";

export async function getPostByIdHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const foundedPost: WithId<PostDBType> | null = await postsService.getPostById(id);
        if (!foundedPost) {
            res.sendStatus(http_response.not_found);
            return;
        }
        res.status(http_response.ok).send(mapToPost(foundedPost));
    } catch (err) {
        errorHandler(err, res);
    }

}