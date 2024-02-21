import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import todolist from "./controller/todolist";
// import { corsOptions } from "./const";

const app = express();
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.use("/todolist", todolist);

// test api
app.get("/", (req, res) => {
  res.send("The API server is working!");
  return;
});

app.listen(port, () => {
  console.log(`server is listening on ${port} !!!`);
});
