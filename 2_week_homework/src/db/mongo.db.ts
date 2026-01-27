import {Collection, Db, MongoClient} from "mongodb";
import * as dotenv from "dotenv";
import {DATABASE_NAME} from "../core/settings/settings";
import {BlogDBType} from "../blogs/domain/blog";
import {PostDBType} from "../posts/domain/post";


dotenv.config();
const BLOG_COLLECTION_NAME = "blogs";
const POST_COLLECTION_NAME = "posts";

const mongoURL: string | undefined = process.env.MONGODB_URL;
if (!mongoURL) {
    throw new Error("MongoDB URL is required");
}
export const client = new MongoClient(mongoURL);
const db: Db = client.db(DATABASE_NAME);
export let blogCollection: Collection<BlogDBType> = db.collection(BLOG_COLLECTION_NAME);
export let postCollection: Collection<PostDBType> = db.collection(POST_COLLECTION_NAME);

export async function runDB() {
    try {
        await client.connect();
        await db.command({ping: 1});
        console.log("Database Connected!");
    } catch (err) {
        console.log(`Database wasn't connected to mongoDB: ${err}`);
        await client.close();
    }
}
