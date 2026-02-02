import {Router} from "express";
import {loginHandler} from "./handlers/login.handler";
import {authInputValidation} from "./validation/auth_input.validation.middleware";
import {inputValidationResult} from "../../../core/middlewares/input_validation.result.middleware";

export const authRouter: Router = Router({})

authRouter.post('/login',
    authInputValidation,
    inputValidationResult,
    loginHandler
);