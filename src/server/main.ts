import express from "express";
import ViteExpress from "vite-express";
import { mongoose } from "./db.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();

import router from "./routes.js";

app.use(cors());
app.use(express.json());
app.use("/api", router);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
