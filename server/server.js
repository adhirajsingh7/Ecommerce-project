require("dotenv").config();
const db_connection = require("./config/db_connection");
const APP_PORT = process.env.APP_PORT || 8080;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// DB connection
db_connection();

// Routes
app.use(require("./routes"));

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
