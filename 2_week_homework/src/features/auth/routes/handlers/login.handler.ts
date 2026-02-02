import {Response, Request} from "express";
import {authService} from "../../application/auth.service";
import {LoginDtoInput} from "../../types/login_dto.input";
import {http_response} from "../../../../core/types/http_responses";

export async function loginHandler(
    req: Request,
    res: Response): Promise<void> {
    const loginDto: LoginDtoInput = req.body;
    const authResult:boolean = await authService.loginUser(loginDto);
    if (authResult){
        res.sendStatus(http_response.no_content);
        return;
    }
    res.sendStatus(http_response.unauthorized);
}