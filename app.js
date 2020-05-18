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

app.get("/", function(req, res){
  res.render("home");
});

app.get("/free-roll", function(req, res){
  res.render("free-roll");
});

app.get("/effects-list", function(req, res){

  Effect.find({}, function(err, foundEffects){
    if(foundEffects.length === 0){
      console.log("no items");
      res.redirect("/");
    }else {
      console.log("success");

      res.render("effects-list", {
        effectItems: foundEffects
      });
    }

  });
});

app.get("/hidden/post/update-effects", function(req, res){
  res.render("update-effects");
});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started");
});
