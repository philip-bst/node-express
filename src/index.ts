import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { UserRoutes } from "./routes";

import { logger } from "./middlewares";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(logger);

app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.send("Express Server");
});

app.use("/users", UserRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
