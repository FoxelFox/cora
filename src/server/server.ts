import * as socket from "socket.io";
import * as express from "express";
import * as http from "http";

class Server {

  constructor() {
    let expressApp = express();
    let server = http.createServer(expressApp);
    let router = express.Router();
    let io = socket(server);

    router.use(express.static("./bin/client"));
    expressApp.use("", router);
    server.listen("8080");

  }
}

new Server();
