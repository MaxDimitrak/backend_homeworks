import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {PostInputDto} from "../../dto/post.input_dto";
import {postsRepository} from "../../repositories/posts.repository";
import {WithId} from "mongodb";
import {PostDBType} from "../../types/post";

export const updatePostByIdHandler = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const body: PostInputDto = req.body;
    const updatedPost: WithId<PostDBType> | null = await postsRepository.updatePostById(id, body);
    if (!updatedPost) {
        res.sendStatus(http_response.not_found);
        return;
    }
    res.sendStatus(http_response.no_content)
}