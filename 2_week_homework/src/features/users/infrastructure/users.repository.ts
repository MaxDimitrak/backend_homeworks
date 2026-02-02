import {UserCreateDtoInput} from "../routes/input/user_create.dto-input";
import {userCollection} from "../../../db/mongo.db";
import {UserDBType} from "../domain/user";
import {DeleteResult, InsertOneResult, ObjectId, WithId} from "mongodb";

export const usersRepository = {
    async createUser(dto: UserCreateDtoInput): Promise<string> {
        const newUser: UserDBType = {
            login: dto.login,
            email: dto.email,
            password: dto.password,
            createdAt: new Date(),
        }
        const createdUser: InsertOneResult<UserDBType> = await userCollection.insertOne(newUser);
        return createdUser.insertedId.toString();
    },
    async findUserByEmailOrLogin(
        searchParam: string
    ): Promise<
        {
            user: WithId<UserDBType>,
            matchedField: 'email' | 'login'
        } | null> {
        const foundedUser: WithId<UserDBType> | null = await userCollection.findOne({
            $or: [{email: searchParam}, {login: searchParam}]
        })
        if (!foundedUser) {
            return null;
        }
        const foundedField: 'email' | 'login' = foundedUser.email === searchParam ? 'email' : 'login';
        return {user: foundedUser, matchedField: foundedField};
    },
    async findUserById(id: string): Promise<WithId<UserDBType> | null> {
        return await userCollection.findOne({_id: new ObjectId(id)});
    },
    async deleteUserById(id: string): Promise<boolean> {
        const deletedUser: DeleteResult = await userCollection.deleteOne({_id: new ObjectId(id)});
        return deletedUser.deletedCount === 1;
    }
}