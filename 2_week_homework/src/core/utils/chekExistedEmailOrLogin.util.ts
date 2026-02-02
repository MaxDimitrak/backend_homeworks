import {ErrorValidationTypeOutput} from "../types/error-validation.dto";
import {createErrorMessages} from "./errors.util";
import {usersRepository} from "../../features/users/infrastructure/users.repository";
import {WithId} from "mongodb";
import {UserDBType} from "../../features/users/domain/user";

export async function chekExistedEmailOrLoginUtil(
    field: string,
    param: string): Promise<ErrorValidationTypeOutput | null> {
    const foundUserByParam:
        {
            user: WithId<UserDBType>,
            matchedField: 'email' | 'login'
        } | null = await usersRepository.findUserByEmailOrLogin(param);
    if (foundUserByParam) {
        return createErrorMessages([{message: `${field} should be unique`, field: `${field}`}])
    }
    return null;
}