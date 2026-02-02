import {Filter, ObjectId, WithId} from "mongodb";
import {UserDBType} from "../domain/user";
import {userCollection} from "../../../db/mongo.db";
import {UserQueryDto,} from "../routes/input/user_query_dto.input";

export const usersQueryRepository = {
    async getManyUsers(queryDto: UserQueryDto): Promise<
        {
            users: WithId<UserDBType>[],
            meta: {
                pageNumber: number,
                pageSize: number,
                totalCount: number,
            }
        }> {
        const {
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
            searchLoginTerm,
            searchEmailTerm
        }: UserQueryDto = queryDto;
        const searchConditions: Filter<UserDBType>[] = [];
        if (searchLoginTerm) {
            searchConditions.push({login: {$regex: searchLoginTerm, $options: 'i'}});
        }
        if (searchEmailTerm) {
            searchConditions.push({email: {$regex: searchEmailTerm, $options: 'i'}});
        }
        let filter: Filter<UserDBType> = {};
        if (searchConditions.length === 1) {
            filter = searchConditions[0];
        } else if (searchConditions.length > 1) {
            filter = {$or: searchConditions};
        }
        const totalCount: number = await userCollection.countDocuments(filter);
        const skip: number = (pageNumber - 1) * pageSize;
        const users: WithId<UserDBType>[] = await userCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const meta = {
            pageNumber,
            pageSize,
            totalCount,
        }
        return {users, meta}
    },

    async findUserById(id: string): Promise<WithId<UserDBType> | null> {
        return await userCollection.findOne({_id: new ObjectId(id)});
    }
}