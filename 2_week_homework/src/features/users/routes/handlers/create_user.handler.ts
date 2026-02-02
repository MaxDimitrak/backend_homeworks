import {Request, Response} from "express";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {UserCreateDtoInput} from "../input/user_create.dto-input";
import {UserDataOutput} from "../output/user_data.output";
import {usersService} from "../../application/users.service";
import {usersQueryService} from "../../application/users.query.service";
import {http_response} from "../../../../core/types/http_responses";
import {ErrorValidationTypeOutput} from "../../../../core/types/error-validation.dto";

export async function createUserHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const newUserDto: UserCreateDtoInput = req.body;
        const createdUserIdOrFail: string | ErrorValidationTypeOutput = await usersService.createUser(newUserDto);
        if (typeof createdUserIdOrFail !== "string") {
            res.status(http_response.bad_request).send(createdUserIdOrFail)
            return;
        }
        const newUser: UserDataOutput | null = await usersQueryService.findUserById(createdUserIdOrFail);
        if (!newUser) {
            res.sendStatus(http_response.internal_server_error);
            return;
        }
        res.status(http_response.created).send(newUser);
    } catch (err) {
        errorHandler(err, res)
    }
}