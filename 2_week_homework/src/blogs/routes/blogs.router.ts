import {Router} from "express";
import {getAllBlogsHandler} from "./handlers/get_all_blogs.handler";
import {createBlogHandler} from "./handlers/create_blog.handler";
import {getBlogByIdHandler} from "./handlers/get_blog_by_id.handler";
import {isAuthorized} from "../../middlewares/auth.middleware";
import {updateBlogByIdHandler} from "./handlers/update_blog_by_id.handler";
import {deleteBlogByIdHandler} from "./handlers/delete_blog_by_id.handler";
import {idValidation} from "../../middlewares/params_id.validation.middleware";
import {inputValidationResult} from "../../middlewares/input_validation.result.middleware";
import {blogInputDtoValidation} from "../validation/blog_input_dto.validation.middleware";


export const blogsRouter: Router = Router({})

blogsRouter.get('/', getAllBlogsHandler);
blogsRouter.get('/:id', idValidation, inputValidationResult, getBlogByIdHandler)
blogsRouter.post('/', isAuthorized, blogInputDtoValidation, inputValidationResult, createBlogHandler);
blogsRouter.put('/:id', isAuthorized, idValidation, blogInputDtoValidation, inputValidationResult, updateBlogByIdHandler);
blogsRouter.delete('/:id', isAuthorized, idValidation, inputValidationResult, deleteBlogByIdHandler);