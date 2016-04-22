import * as express from "express";
import * as http from "http";

class Server {

  constructor() {
    let expressApp = express();
    let server = http.createServer(expressApp);
    let router = express.Router();

    router.use(express.static("./bin/client"));
    expressApp.use("", router);

    server.listen("1337");
  }
}

new Server();
