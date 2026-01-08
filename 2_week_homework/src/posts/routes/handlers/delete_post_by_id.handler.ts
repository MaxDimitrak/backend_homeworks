import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {postsRepository} from "../../repositories/posts.repository";


export const deletePostByIdHandler = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const foundIndex = postsRepository.findPostIndex(id)
    if (foundIndex === -1) {
        res.status(http_response.not_found).send("No blog found.");
        return;
    }
    postsRepository.deletePostById(foundIndex);
    res.sendStatus(http_response.no_content);
}