const app: any = require("./app");
const port = process.env.port || 3000;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) { cluster.fork(); }
    cluster.on('exit', (worker, code, signal) => { console.log(`worker ${worker.process.pid} died`); });
} else {
    const server: any = app.listen(port, (res) => { console.log(`Server is running on ${port} port`); });
    module.exports = server;
    console.log(`Worker ${process.pid} started`);
}
