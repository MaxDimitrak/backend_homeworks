import {createApp} from "./app";
import {Express} from "express";


const PORT  = process.env.PORT || 3000;
const app: Express = createApp();

if (process.env.NODE_ENV !== 'production'){
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

export default app;

