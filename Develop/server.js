const mongoose = require("mongoose");
const mongojs = require("mongojs");
const express = require("express");
const morgan = require("morgan");
var path = require("path");
const databaseURL = "Workout";
const collections = ["exercises"];
const db = mongojs(databaseURL, collections);

const PORT = process.env.PORT || 3200;

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//routes
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });

  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
  });
  
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
  });
  
  app.use("/api", require("./routes/api.js"));
  
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}!`);
  });