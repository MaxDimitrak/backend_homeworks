import {Request, Response} from "express";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {http_response} from "../../../../core/types/http_responses";
import {CreatePostForExactBlogInput} from "../../../blogs/routes/input/post_create_for_exact_blog.dto.input";
import {postsService} from "../../application/posts.service";
import {postsQueryRepository} from "../../infrastructure/posts.query.repository";
import {PostDataOutput} from "../output/post_data.output";

export async function createPostForExactBlogHandler(
    req: Request,
    res: Response): Promise<void> {
    try{
        const blogId: string = req.params.blogId;
        const dto: CreatePostForExactBlogInput = req.body;
        const createdPostId: string | null = await postsService.createPostForExactBlog(blogId, dto);
        if (!createdPostId) {
            res.sendStatus(http_response.not_found);
            return;
        }
        const createdPost: PostDataOutput | null = await postsQueryRepository.getPostById(createdPostId);
        if (!createdPost) {
            res.sendStatus(http_response.internal_server_error);
            return;
        }
        res.status(http_response.created).send(createdPost);
    }catch(err){
        errorHandler(err, res);
    }
}