import {Collection, Db, MongoClient} from "mongodb";
import * as dotenv from "dotenv";
import {DATABASE_NAME} from "../core/settings/settings";
import {Blog} from "../blogs/types/blog";

dotenv.config();
const BLOG_COLLECTION_NAME = "blogs";

const mongoURL: string | undefined = process.env.MONGODB_URL;
if (!mongoURL) {
    throw new Error("MongoDB URL is required");
}
export const client = new MongoClient(mongoURL);
export let blogCollection: Collection<Blog>

export async function runDB() {
    try {
        await client.connect();
        const db:Db = client.db(DATABASE_NAME);
        blogCollection = db.collection(BLOG_COLLECTION_NAME)
        await db.command({ping: 1});
        console.log("Database Connected");
    } catch (err) {
        console.log(`Database wasn't connected to mongoDB: ${err}`);
        await client.close();
    }
}
