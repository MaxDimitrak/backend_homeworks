import * as bcrypt from 'bcrypt';
import {UserCreateDtoInput} from "../routes/input/user_create.dto-input";
import {usersRepository} from "../infrastructure/users.repository";
import {ErrorValidationTypeOutput} from "../../../core/types/error-validation.dto";
import {chekExistedEmailOrLoginUtil} from "../../../core/utils/chekExistedEmailOrLogin.util";

export const usersService = {
    async createUser(dto: UserCreateDtoInput): Promise<string | ErrorValidationTypeOutput> {
        const foundUserByEmail: ErrorValidationTypeOutput | null = await chekExistedEmailOrLoginUtil('email', dto.email);
        const foundUserByLogin: ErrorValidationTypeOutput| null = await chekExistedEmailOrLoginUtil('login', dto.login);
        if (foundUserByEmail) {
            return foundUserByEmail;
        }
        if (foundUserByLogin) {
            return foundUserByLogin;
        }
        const saltRounds: number = 10;
        const hashPassword: string = await bcrypt.hash(dto.password, saltRounds);
        const newUserDto: UserCreateDtoInput = {
            login: dto.login,
            password: hashPassword,
            email: dto.email,
        }
        return await usersRepository.createUser(newUserDto);

    },
    async deleteUserById(id: string): Promise<boolean> {
        return await usersRepository.deleteUserById(id)
    }

}