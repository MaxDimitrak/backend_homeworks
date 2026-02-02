import {Router} from "express";
import {getManyBlogsHandler} from "./handlers/get_many_blogs.handler";
import {createBlogHandler} from "./handlers/create_blog.handler";
import {getBlogByIdHandler} from "./handlers/get_blog_by_id.handler";
import {isAuthorized} from "../../../core/middlewares/auth.middleware";
import {updateBlogByIdHandler} from "./handlers/update_blog_by_id.handler";
import {deleteBlogByIdHandler} from "./handlers/delete_blog_by_id.handler";
import {idValidation} from "../../../core/middlewares/params_id.validation.middleware";
import {inputValidationResult} from "../../../core/middlewares/input_validation.result.middleware";
import {blogInputDtoValidation} from "./validation/blog_input_dto.validation.middleware";
import {paginationAndSortingValidationMiddleware} from "../../../core/middlewares/query_pagination_and_sorting.validation.middleware";
import {BlogSortFields} from "./input/blog_sort_fields";
import {postForExactBlogInputDtoValidation} from "./validation/post_for_exact_blog_input_dto.validation.middleware";
import {createPostForExactBlogHandler} from "../../posts/routes/handlers/create_post_for_exact_blog.handler";
import {blogIdValidation} from "./validation/blog_id.validation.middleware";
import {getPostsByBlogIdHandler} from "../../posts/routes/handlers/get_posts_by_blog_id.handler";
import {PostSortFields} from "../../posts/routes/input/post_sort_fields";
import {
    querySearchNameTermValidationMiddleware
} from "./validation/query_search_name_term.validation.middleware";


export const blogsRouter: Router = Router({})

blogsRouter.get('/',
    paginationAndSortingValidationMiddleware(BlogSortFields),
    querySearchNameTermValidationMiddleware,
    inputValidationResult,
    getManyBlogsHandler
);

blogsRouter.get('/:id',
    idValidation,
    inputValidationResult,
    getBlogByIdHandler
);

blogsRouter.get('/:blogId/posts',
    blogIdValidation,
    paginationAndSortingValidationMiddleware(PostSortFields),
    inputValidationResult,
    getPostsByBlogIdHandler
);

blogsRouter.post('/:blogId/posts',
    isAuthorized,
    blogIdValidation,
    postForExactBlogInputDtoValidation,
    inputValidationResult,
    createPostForExactBlogHandler,
)
blogsRouter.post('/',
    isAuthorized,
    blogInputDtoValidation,
    inputValidationResult,
    createBlogHandler
);
blogsRouter.put('/:id',
    isAuthorized,
    idValidation,
    blogInputDtoValidation,
    inputValidationResult,
    updateBlogByIdHandler
);
blogsRouter.delete('/:id',
    isAuthorized,
    idValidation,
    inputValidationResult,
    deleteBlogByIdHandler
);