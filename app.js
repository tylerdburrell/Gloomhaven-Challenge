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

const Schema = mongoose.Schema;

const effectSchema = new Schema({
  type: String,
  content: String
});

app.get("/", function(req, res){
  res.render("home");
});

app.get("/free-roll", function(req, res){
  res.render("free-roll");
});

app.get("/effects-list", function(req, res){
  res.render("effects-list");
});

app.get("/hidden/post/update-effects", function(req, res){
  res.render("update-effects");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
