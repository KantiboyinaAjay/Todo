const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require("../Routes/routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use("/", require("../Routes/routes"));

mongoose
  .connect(
    "mongodb+srv://ajaykantiboyina:Ajay%406203@cluster0.vleuyp5.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to Mongo DB");
    app.listen(9000, () => {
      console.log(`App running on port: 9000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
