import {Request, Response} from 'express';
import {errorHandler} from "../../../../core/errors/errors.handler";
import {usersRepository} from "../../infrastructure/users.repository";
import {http_response} from "../../../../core/types/http_responses";

export async function deleteUserHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const deletedUser: boolean = await usersRepository.deleteUserById(id);
        if (!deletedUser) {
            res.sendStatus(http_response.not_found)
        }
        res.sendStatus(http_response.no_content)
    } catch (err) {
        errorHandler(err, res)
    }
}