//jshint esversion:6
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/", async function (req, res) {
  const positiveEffects = await getRandomEffect("Positive", 4);
  const negativeEffects = await getRandomEffect("Negative", 4);
  res.render("home", {
    negative: negativeEffects,
    positive: positiveEffects,
  });
});

app.get("/free-roll", async function (req, res) {
  negative = await getRandomEffect("Negative", 1)[0];
  positive = await getRandomEffect("Positive", 1)[0];
  res.render("free-roll", {
    negative,
    positive
  });
});

app.get("/effects-list", function (req, res) {

  Effect.find({}, function (err, foundEffects) {
    res.render("effects-list", {
      effectItems: foundEffects
    });
  });
});

app.get("/update-effects", function (req, res) {
  Effect.find({}, function (err, foundEffects) {
    res.render("update-effects", {
      effectItems: foundEffects
    });
  });
});

app.post("/", function (req, res) {

  const effectContent = req.body.newContent;
  const effectType = req.body.type;

  const effect = new Effect({
    type: effectType,
    content: effectContent
  });

  effect.save();
  res.redirect("/update-effects");

});

app.post("/delete", function (req, res) {

  const checkedItemID = req.body.delete;

  Effect.findByIdAndRemove(checkedItemID, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/update-effects");
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started on port: " + port);
});


const getRandomEffect = async (type, count) => {
  const effect = await Effect.aggregate([
    { $match: { type: type } },
    { $sample: { size: count } }
  ]);
  return effect.map(effect => effect.content);
}