import {Router} from "express";
import {
    paginationAndSortingValidationMiddleware
} from "../../../core/middlewares/query_pagination_and_sorting.validation.middleware";
import {validationResult} from "express-validator";
import {
    querySearchEmailAndLoginTermsValidationMiddleware
} from "./validation/query_search_email_and_login_terms.validation.middleware";
import {isAuthorized} from "../../../core/middlewares/auth.middleware";
import {userInputDtoValidationMiddleware} from "./validation/user_input_dto.validation.middleware";
import {createUserHandler} from "./handlers/create_user.handler";
import {getManyUsersHandler} from "./handlers/get_many_users.handler";
import {idValidation} from "../../../core/middlewares/params_id.validation.middleware";
import {deleteUserHandler} from "./handlers/delete_user_by_id.handler";
import {UserSortFields} from "./input/user_sort_fields";
import {Request, Response} from "express";
import {inputValidationResult} from "../../../core/middlewares/input_validation.result.middleware";

export const usersRouter: Router = Router({})


usersRouter.get('/',
    isAuthorized,
    querySearchEmailAndLoginTermsValidationMiddleware,
    paginationAndSortingValidationMiddleware(UserSortFields),
    inputValidationResult,
    getManyUsersHandler
);

usersRouter.post('/',
    isAuthorized,
    userInputDtoValidationMiddleware,
    inputValidationResult,
    createUserHandler
);

usersRouter.delete('/:id',
    isAuthorized,
    idValidation,
    inputValidationResult,
    deleteUserHandler
);
