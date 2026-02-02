import {UserDataOutput} from "../routes/output/user_data.output";
import {WithId} from "mongodb";
import {UserDBType} from "../domain/user";
import {usersQueryRepository} from "../infrastructure/users.query.repository";
import {mapToUserUtil} from "../routes/mappers/map_to_user.util";
import {UserQueryDto} from "../routes/input/user_query_dto.input";
import {UserPaginatedDataOutput} from "../routes/output/user_paginated_data.output";
import {mapToUserPaginatedListUtil} from "../routes/mappers/map_to_user_paginated_list.util";

export const usersQueryService = {
    async getManyUsers(queryDto: UserQueryDto): Promise<UserPaginatedDataOutput> {
        const {users, meta} = await usersQueryRepository.getManyUsers(queryDto);
        return mapToUserPaginatedListUtil(users, meta)
    },
    async findUserById(id: string): Promise<UserDataOutput | null> {
        const foundUser: WithId<UserDBType> | null = await usersQueryRepository.findUserById(id);
        if (!foundUser) {
            return null;
        }
        return mapToUserUtil(foundUser);
    }
}