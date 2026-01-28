import {Router} from "express";
import {getManyBlogsHandler} from "./handlers/get_many_blogs.handler";
import {createBlogHandler} from "./handlers/create_blog.handler";
import {getBlogByIdHandler} from "./handlers/get_blog_by_id.handler";
import {isAuthorized} from "../../middlewares/auth.middleware";
import {updateBlogByIdHandler} from "./handlers/update_blog_by_id.handler";
import {deleteBlogByIdHandler} from "./handlers/delete_blog_by_id.handler";
import {idValidation} from "../../middlewares/params_id.validation.middleware";
import {inputValidationResult} from "../../middlewares/input_validation.result.middleware";
import {blogInputDtoValidation} from "./validation/blog_input_dto.validation.middleware";
import {paginationAnaSortingValidation} from "../../middlewares/query-pagination-ana-sorting.validation-middleware";
import {BlogSortFields} from "./input/blog-sort-fields";
import {postForExactBlogInputDtoValidation} from "./validation/post_for_exact_blog_input_dto.validation.middleware";
import {createPostForExactBlogHandler} from "./handlers/create_post_for_exact_blog.handler";


export const blogsRouter: Router = Router({})

blogsRouter.get('/',
    paginationAnaSortingValidation(BlogSortFields),
    inputValidationResult,
    getManyBlogsHandler
);

blogsRouter.get('/:id',
    idValidation,
    inputValidationResult,
    getBlogByIdHandler
);

blogsRouter.get('/:id/posts',
    idValidation,
    inputValidationResult,
    inputValidationResult
);

blogsRouter.post('/:blogId/posts',
    isAuthorized,
    idValidation,
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