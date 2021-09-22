import express from "express";
import './database';
import { seed } from "./seed";
import router from "./src/routes";
import { connection } from "mongoose";

const port = 3001;
const HOST = "0.0.0.0";
const app = express();

(async () => {
  await connection;
  await seed(true);

  app.use(express.json());
  app.use('/v1/api', router);

  app.listen(port, HOST, () => {
    console.log(`listening ${HOST}:${port}...`);
  });
})();