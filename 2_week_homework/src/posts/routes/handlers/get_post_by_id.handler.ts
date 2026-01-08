import {Request, Response} from "express";

import {http_response} from "../../../core/types/http_responses";
import {Post} from "../../types/post";
import {postsRepository} from "../../repositories/posts.repository";

export const getPostByIdHandler = async (req: Request, res:Response) => {
    const id: string = req.params.id;
    const foundPost: Post | undefined = postsRepository.getPostById(id);
    if (!foundPost) {
        res.status(http_response.not_found).send("Not found blog");
        return;
    }
    res.status(http_response.ok).send(foundPost);
}