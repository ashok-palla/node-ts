const app: any = require("./app");
var port = process.env.port || 3000;
const server: any = app.listen(port, (res) => { console.log(port); });
export = server;