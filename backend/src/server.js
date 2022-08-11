import express from "express";
import cors from "cors";
import helmet from "helmet";

import config from "./config.js";
import indexRoutes from "./routes/index.js";
import errorHandler from "./errors/errorHandler.js";

const initSever = () => {
  const app = express();

  app.use(express.json());
  app.use(cors({ exposedHeaders: [] }));
  app.use(helmet());

  app.use("/api/v1", indexRoutes);

  app.use("*", (_req, res) => {
    res.status(404).json({
      status: "ERROR",
      data: "Not found",
    });
  });

  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

export default initSever;
