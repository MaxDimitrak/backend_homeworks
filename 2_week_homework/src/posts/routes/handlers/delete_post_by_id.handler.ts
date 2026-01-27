import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {postsService} from "../../application/posts.service";
import {errorHandler} from "../../../core/errors/errors.handler";


export async function deletePostByIdHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const deletedPost: boolean = await postsService.deletePostById(id);
        if (!deletedPost) {
            res.sendStatus(http_response.not_found);
            return;
        }
        res.sendStatus(http_response.no_content);
    } catch (err) {
        errorHandler(err, res)
    }

}