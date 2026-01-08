import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {PostInputDto} from "../../dto/post.input_dto";
import {postsRepository} from "../../repositories/posts.repository";


export const createPostHandler = (req: Request, res: Response): void => {
    const body: PostInputDto = req.body;
    res.status(http_response.created).send(postsRepository.createPost(body));
}