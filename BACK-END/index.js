"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
app.use(express.json());

const usersRouter = require("./app/routes/users-routes");
// const coverRouter = require("./app/routes/cover-routes");
// const browserRouter = require("./app/routes/browser-routes");

const port = process.env.SERVER_PORT || 3080;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/users/", usersRouter);
// app.use("/api/v1/cover/", coverRouter);
// app.use("/api/v1/browser/", browserRouter);

app.listen(port, () => console.log(`Listening ${port}...`));
