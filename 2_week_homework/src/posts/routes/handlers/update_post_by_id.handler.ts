import {Request, Response} from 'express';

import {http_response} from "../../../core/types/http_responses";

import {PostInputDto} from "../../dto/post.input_dto";
import {postsRepository} from "../../repositories/posts.repository";

export const updatePostByIdHandler = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const body: PostInputDto = req.body;
    if (!postsRepository.getPostById(id)) {
        res.status(http_response.not_found).send({error: 'Blog not found'});
    }
    postsRepository.updatePostById(id, body);
    res.sendStatus(http_response.no_content)
}