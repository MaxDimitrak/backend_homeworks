import {WithId} from "mongodb";
import {UserDBType} from "../../domain/user";
import {UserDataOutput} from "../output/user_data.output";

export function mapToUserUtil(
    user: WithId<UserDBType>
): UserDataOutput {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    }
}