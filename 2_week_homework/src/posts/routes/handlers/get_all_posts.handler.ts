import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {postsRepository} from "../../repositories/posts.repository";

export const getAllPostsHandler = (req: Request, res: Response) => {
    res.status(http_response.ok).send(postsRepository.getAllPosts())
}