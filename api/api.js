import express from "express";
import bodyParser from "body-parser";
const api = express();
const port = 3000;
const router = express.Router();

import universityRouter from "./router/universityRouter.js";

api.use(
  "/university",

  universityRouter,
);

api.use(bodyParser.json());
api.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
