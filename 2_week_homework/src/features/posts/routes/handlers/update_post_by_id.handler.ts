import {Request, Response} from 'express';
import {http_response} from "../../../../core/types/http_responses";
import {PostCreateDtoInput} from "../input/post-create.dto-input";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.service";


export async function updatePostByIdHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const body: PostCreateDtoInput = req.body;
        const updatedPost: boolean = await postsService.updatePostById(id, body);
        if (!updatedPost) {
            res.sendStatus(http_response.not_found);
            return;
        }
        res.sendStatus(http_response.no_content);
    } catch (err) {
        errorHandler(err, res);
    }

}