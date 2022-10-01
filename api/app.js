const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

export class App {
  express;
  port;

  constructor(port, controllers) {
    this.express = express();
    this.port = port;
    this.configureMiddleware();
    this.configureControllers(controllers);
  }

  configureMiddleware() {
    var corsOptions = {
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
    };

    this.express.use(cors(corsOptions));
    this.express.use(express.json());
    this.express.use(helmet());
  }

  configureControllers(controllers) {
    controllers.forEach((controller) => {
      this.express.use("/api", controller.router);
    });
  }

  listen() {
    // endpoints
    // this.express.get("/api", (_req, res) => {
    //   res.send("Hello From API");
    // });

    this.express.listen(this.port, () => {
      console.log(
        `🔥🔥 Server is running on http://localhost:${this.port} 🔥🔥`
      );
    });
  }
}
