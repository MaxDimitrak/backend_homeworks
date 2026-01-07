import {NextFunction, Request, Response} from "express";
import {http_response} from "../core/types/http_responses";


export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const ADMIN_USERNAME: string = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD || 'qwerty';
    const authorization: string | undefined = req.get('authorization');
    if (!authorization) {
        res.sendStatus(http_response.unauthorized);
        return;
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Basic') {
        res.sendStatus(http_response.unauthorized);
        return;
    }
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        res.sendStatus(http_response.unauthorized);
        return;
    }

    next();
}