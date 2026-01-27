import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {PostDBType} from "../../domain/post";
import {PostCreateDtoInput} from "../input/post-create.dto-input";
import {mapToPost} from "../mappers/map-to-post.util";
import {postsService} from "../../application/posts.service";
import {errorHandler} from "../../../core/errors/errors.handler";


export async function createPostHandler (
    req: Request,
    res: Response): Promise<void> {
    try{
        const body: PostCreateDtoInput = req.body;
        const createdPost: WithId<PostDBType> = await postsService.createPost(body);
        res.status(http_response.created).send(mapToPost(createdPost));
    }catch(err){
        errorHandler(err, res);
    }

}