import * as express from "express";
import * as apiController from "./controllers/api";
const app: any = express();

app.use(apiController.globalApiHandler);
app.get("/", apiController.defaultApi);

module.exports = app;