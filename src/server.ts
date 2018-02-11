const app: any = require("./app");
const server: any = app.listen(4200, () => { console.log("Press CTRL+C to stop express server"); });
export = server;