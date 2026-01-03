"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
const app = (0, app_1.createApp)();
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
}
