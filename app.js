//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-tyler:"+ process.env.DB_PASS +"@cluster0-h3nyl.gcp.mongodb.net/GloomDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", function(req, res){
  res.render("home");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
