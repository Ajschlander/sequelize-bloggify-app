require("dotenv").config();
const express = require("express"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  expressSanitizer = require("express-sanitizer"),
  passport = require("passport"),
  session = require("express-session"),
  db = require("./models"),
  app = express(),
  PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
const API = require("./routes/apiRoutes");
API.api(app);
const authAPI = require("./routes/auth");
authAPI.api(app, passport);

//load passport strategies
require("./config/passport.js")(passport, db.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
