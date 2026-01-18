import {createApp} from "./app";
import {Express} from "express";
import {runDB} from "./db/mongo.db";


const PORT  = process.env.PORT || 3000;
const app: Express = createApp();

const startApp = async () => {
    await runDB();
    if (process.env.NODE_ENV !== 'production'){
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    }
}
startApp().catch((err) => {
    console.log(`Error occurred while starting mongoDB: ${err}`);
});

export default app;

