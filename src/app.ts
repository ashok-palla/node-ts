import * as express from "express";
import * as bodyParser from "body-parser";
import * as apiController from "./controllers/api";
const os:any = require("./controllers/os");
const app: any = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(apiController.globalApiHandler);
app.get("/", apiController.login);
app.post("/login", apiController.login);

app.get("/city", apiController.city_get);
app.put("/city", apiController.CITY_INSERT);
app.post("/city", apiController.CITY_GET);
app.delete("/city", apiController.CITY_DELETE);

app.get("/employee/", apiController.EMPLOYEE_GET);
app.get("/employee/?:id", apiController.EMPLOYEE_GET);

module.exports = app;