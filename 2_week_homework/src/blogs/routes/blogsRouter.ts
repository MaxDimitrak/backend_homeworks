import {Router} from "express";
import {getAllHAndler} from "./handlers/get_all.handler";
import {createBlogHandler} from "./handlers/create_blog.handler";
import {getBlogByIdHandler} from "./handlers/get_blog_by_id.handler";
import {isAuthorized} from "../../middlewares/auth.middleware";
import {updateBlogByIdHandler} from "./handlers/update_blog_by_id.handler";
import {deleteBlogByIdHandler} from "./handlers/delete_blog_by_id.handler";


export const blogsRouter: Router = Router({})

blogsRouter.get('/', getAllHAndler);
blogsRouter.get('/:id', getBlogByIdHandler)
blogsRouter.post('/', isAuthorized, createBlogHandler);
blogsRouter.put('/:id', isAuthorized, updateBlogByIdHandler);
blogsRouter.delete('/:id', isAuthorized, deleteBlogByIdHandler);