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

mongoose.connect("mongodb+srv://admin-tyler:"+ process.env.DB_PASS +"@cluster0-h3nyl.gcp.mongodb.net/gloomDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const effectsSchema = {
  type: String,
  content: String
};

const Effect = mongoose.model("Effect", effectsSchema);

var randomNegative = "";
var randomPositive = "";

app.get("/", function(req, res){
  res.render("home");
});

app.get("/free-roll", function(req, res){

  Effect.aggregate([
      {$match: {type: "Negative"}},
      {$sample: {size: 1}}
  ]).then(function(res){
    randomNegative = res[0].content;
  });

  Effect.aggregate([
      {$match: {type: "Positive"}},
      {$sample: {size: 1}}
  ]).then(function(res){
    randomPositive = res[0].content;
  });

  res.render("free-roll", {
    negative: randomNegative,
    positive: randomPositive
  });
});

app.get("/effects-list", function(req, res){

  Effect.find({}, function(err, foundEffects){
      res.render("effects-list", {
        effectItems: foundEffects
      });
  });
});

app.get("/update-effects", function(req, res){
  Effect.find({}, function(err, foundEffects){
      res.render("update-effects", {
        effectItems: foundEffects
      });
  });
});

app.post("/", function(req, res) {

  const effectContent = req.body.newContent;
  const effectType = req.body.type;

  const effect = new Effect({
    type: effectType,
    content: effectContent
  });

  effect.save();
  res.redirect("/update-effects");

});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started");
});
