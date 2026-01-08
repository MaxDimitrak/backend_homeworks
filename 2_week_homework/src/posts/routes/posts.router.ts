import express, {Router} from "express";
import {getAllPostsHandler} from "./handlers/get_all_posts.handler";
import {getPostByIdHandler} from "./handlers/get_post_by_id.handler";
import {isAuthorized} from "../../middlewares/auth.middleware";
import {createPostHandler} from "./handlers/create_post.handler";
import {updatePostByIdHandler} from "./handlers/update_post_by_id.handler";
import {deletePostByIdHandler} from "./handlers/delete_post_by_id.handler";
import {postInputDtoValidation} from "../validation/post_input_dto.validation.middleware";
import {inputValidationResult} from "../../middlewares/input_validation.result.middleware";


export const postsRouter: Router = express.Router({});

postsRouter.get('/', getAllPostsHandler);
postsRouter.get('/:id', getPostByIdHandler);
postsRouter.post('/', isAuthorized, postInputDtoValidation, inputValidationResult, createPostHandler);
postsRouter.put('/:id', isAuthorized, postInputDtoValidation, inputValidationResult, updatePostByIdHandler)
postsRouter.delete('/:id', isAuthorized, deletePostByIdHandler);