import express, {Router} from "express";
import {getManyPostsHandler} from "./handlers/get_many_posts.handler";
import {getPostByIdHandler} from "./handlers/get_post_by_id.handler";
import {isAuthorized} from "../../middlewares/auth.middleware";
import {createPostHandler} from "./handlers/create_post.handler";
import {updatePostByIdHandler} from "./handlers/update_post_by_id.handler";
import {deletePostByIdHandler} from "./handlers/delete_post_by_id.handler";
import {postInputDtoValidation} from "./validation/post_input_dto.validation.middleware";
import {inputValidationResult} from "../../middlewares/input_validation.result.middleware";
import {paginationAnaSortingValidation} from "../../middlewares/query-pagination-ana-sorting.validation-middleware";
import {PostSortFields} from "./input/post-sort-fields";
import {idValidation} from "../../middlewares/params_id.validation.middleware";


export const postsRouter: Router = express.Router({});

postsRouter.get('/',
    paginationAnaSortingValidation<PostSortFields>,
    inputValidationResult,
    getManyPostsHandler
);

postsRouter.get('/:id',
    idValidation,
    inputValidationResult,
    getPostByIdHandler
);

postsRouter.post('/',
    isAuthorized,
    postInputDtoValidation,
    inputValidationResult,
    createPostHandler
);

postsRouter.put('/:id',
    isAuthorized,
    idValidation,
    postInputDtoValidation,
    inputValidationResult,
    updatePostByIdHandler
);

postsRouter.delete('/:id',
    isAuthorized,
    idValidation,
    inputValidationResult,
    deletePostByIdHandler
);