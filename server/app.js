const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

mongoose
  .connect("mongodb://localhost/nomflix")
  .then(() => console.log("connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(cors());
require("./routes")(app);

const port = process.env.EXPRESS_PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
