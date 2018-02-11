const app: any = require("./app");
const server: any = app.listen(3000, () => { console.log("Press CTRL+C to stop express server"); });
// the function is executed every time the app receives a request
export = server;