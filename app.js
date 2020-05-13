//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-tyler:"+ process.env.DB_PASS +"@cluster0-h3nyl.gcp.mongodb.net/fishingDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
