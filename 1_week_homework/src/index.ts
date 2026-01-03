import {createApp} from "./app";

const PORT = process.env.PORT || 3000;
const app = createApp();
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    })

}
