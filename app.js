//jshint esversion:6
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-tyler:merrychristmas@cluster0-h3nyl.gcp.mongodb.net/gloomDB?retryWrites=true&w=majority", {
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
var randomNegative1 = "";
var randomPositive1 = "";
var randomNegative2 = "";
var randomPositive2 = "";
var randomNegative3 = "";
var randomPositive3 = "";
var randomNegative4 = "";
var randomPositive4 = "";

app.get("/", function(req, res){

    Effect.aggregate([
        {$match: {type: "Negative"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomNegative1 = res[0].content;
    });

    Effect.aggregate([
        {$match: {type: "Positive"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomPositive1 = res[0].content;
    });

    Effect.aggregate([
        {$match: {type: "Negative"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomNegative2 = res[0].content;
    });

    Effect.aggregate([
        {$match: {type: "Positive"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomPositive2 = res[0].content;
    });

    Effect.aggregate([
        {$match: {type: "Negative"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomNegative3 = res[0].content;
    });

    Effect.aggregate([
        {$match: {type: "Positive"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomPositive3 = res[0].content;
    });

    Effect.aggregate([
        {$match: {type: "Negative"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomNegative4 = res[0].content;
    });

    Effect.aggregate([
        {$match: {type: "Positive"}},
        {$sample: {size: 1}}
    ]).then(function(res){
      randomPositive4 = res[0].content;
    });



  res.render("home", {
    negative1: randomNegative1,
    positive1: randomPositive1,
    negative2: randomNegative2,
    positive2: randomPositive2,
    negative3: randomNegative3,
    positive3: randomPositive3,
    negative4: randomNegative4,
    positive4: randomPositive4
  });
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

app.post("/delete", function(req, res) {

  const checkedItemID = req.body.delete;

  Effect.findByIdAndRemove(checkedItemID, function(err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/update-effects");
  });

});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port: " + port);
});
