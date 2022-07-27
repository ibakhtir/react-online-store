require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const routes = require("./routes/index");
const initDatabase = require("./start/initDatabase");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(process.env.mongoUri);
    app.listen(8080, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    );
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
