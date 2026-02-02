import {LoginDtoInput} from "../types/login_dto.input";
import * as bcrypt from "bcrypt";
import {usersRepository} from "../../users/infrastructure/users.repository";

export const  authService = {
    async loginUser(loginDto: LoginDtoInput): Promise<boolean>{
        const foundUser = await usersRepository.findUserByEmailOrLogin(loginDto.loginOrEmail);
        if(foundUser){
            return await bcrypt.compare(loginDto.password, foundUser.user.password)
        }
        return false;
    }
}