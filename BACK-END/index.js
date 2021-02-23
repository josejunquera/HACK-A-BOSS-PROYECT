"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");

app.use(fileUpload());
app.use(express.json());
app.use(cors());

const usersRouter = require("./app/routes/users-routes");
const musiciansRouter = require("./app/routes/musicians-routes");
const bandsRouter = require("./app/routes/bands-routes");
const venuesEventsRouter = require("./app/routes/venues-events-routes");
// const coverRouter = require("./app/routes/cover-routes");
// const browserRouter = require("./app/routes/browser-routes");

const port = process.env.SERVER_PORT || 3080;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/users/", usersRouter);
app.use("/api/v1/musicians/", musiciansRouter);
app.use("/api/v1/bands/", bandsRouter);
app.use("/api/v1/venues-events/", venuesEventsRouter);

// app.use("/api/v1/cover/", coverRouter);
// app.use("/api/v1/browser/", browserRouter);

app.listen(port, () => console.log(`Listening ${port}...`));
