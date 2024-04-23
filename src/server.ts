require("dotenv").config();

import cors from "cors";
import express from "express";
import router from "./router";

const { database } = require("../db");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/", router);

database()

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
