var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    methodOverride = require("method-override");

// APP CONFIG
//mongoose.connect("mongodb://localhost/checkin_app");
mongoose.connect("mongodb://admin17:admin19148@ds149431.mlab.com:49431/checkin");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//== HOW TO SETUP A TEST DB
// MONGOOSE/MODEL CONFIG
var displaySchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  service: String,
  extraservice: String,
  tech: String  
});

var Display = mongoose.model("Display", displaySchema);

// === RESTFUL ROUTES ===
app.get("/", function(req, res) {
  res.redirect("/displays");
});

//TEST DATA
Display.remove({}, function(err) {
  if (err) {
    console.log(err);
  }
});
//=========

// === INDEX ===
app.get("/displays", function(req, res) {
  Display.find({}, function(err, displays) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {displays: displays});
    }
  });
});

// === NEW ===
app.get("/displays/signin", function(req, res) {
  res.render("signin");
});

// === CREATE ===
app.post("/displays", function(req, res) {
  // create new info
  Display.create(req.body.display, function(err, newDisplay) {
    if (err) {
      res.render("signin");
    } else {
      // then redirect to the index
      res.redirect("/displays");
    }
  });
});


// === SERVER STARTING CONFIG
app.listen(process.env.PORT || 3000, function(){
  console.log("Your app's server is running!!");
});
