import {Request, Response} from "express";
import {http_response} from "../../../../core/types/http_responses";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.service";
import {PostDataOutput} from "../output/post_data.output";

export async function getPostByIdHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const foundedPost: PostDataOutput | null = await postsService.getPostById(id);
        if (!foundedPost) {
            res.sendStatus(http_response.not_found);
            return;
        }
        res.status(http_response.ok).send(foundedPost);
    } catch (err) {
        errorHandler(err, res);
    }

}