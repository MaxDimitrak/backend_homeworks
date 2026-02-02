import {Request, Response} from "express";
import {UserQueryDto} from "../input/user_query_dto.input";
import {
    setDefaultPaginationAndSortIfNotExist
} from "../../../../core/helpers/set_default_pagination_and_sort_if_not_exist.helper";
import {matchedData} from "express-validator";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {UserPaginatedDataOutput} from "../output/user_paginated_data.output";
import {usersQueryService} from "../../application/users.query.service";
import {http_response} from "../../../../core/types/http_responses";

export async function getManyUsersHandler(
    req: Request,
    res: Response): Promise<void> {
    try {
        const sanitizedQuery: UserQueryDto = matchedData<UserQueryDto>(req, {
            locations: ['query'],
            includeOptionals: true
        });
        const query: UserQueryDto = setDefaultPaginationAndSortIfNotExist(sanitizedQuery);
        query.searchLoginTerm = sanitizedQuery.searchLoginTerm;
        query.searchEmailTerm = sanitizedQuery.searchEmailTerm;
        const users: UserPaginatedDataOutput = await usersQueryService.getManyUsers(query);
        res.status(http_response.ok).send(users);
    } catch (err) {
        errorHandler(err, res)
    }

}