require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 3000; //Changed to 3000 from 8080 (to run at same time as tinyapp)
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieParser = require('cookie-parser');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const mapsRoutes = require("./routes/maps");
// const mapsNewRoutes = require("./routes/maps_new");
const mapsId = require("./routes/maps_id");
const userProfile = require("./routes/profile");
const parks = require("./routes/parks");
// const parksNewRoutes = require("./routes/parks_new");
const parksId = require("./routes/parks_id");


const {loginGet, loginPost} = require("./routes/login");
const {registerGet, registerPost} = require("./routes/register");
const {parksNewGet, parksNewPost} = require("./routes/parks_new");
const logoutPost = require("./routes/logout");
const { mapsNewGet, mapsNewPost } = require("./routes/maps_new");
const map_fav = require("./routes/map_fav")

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/maps", mapsRoutes(db));
// app.use("/maps/new", mapsNewRoutes(db));
app.use("/maps/new", mapsNewGet(db));
app.use("/maps/new", mapsNewPost(db));
app.use("/maps", mapsId(db));
app.use("/profile", userProfile(db));
app.use("/parks", parks(db));
app.use("/parks/new", parksNewGet(db));
app.use("/parks/new", parksNewPost(db));
app.use("/parks", parksId(db));
app.use("/login", loginGet(db));
app.use("/login", loginPost(db));
app.use("/logout", logoutPost(db));
app.use("/register", registerGet(db));
app.use("/register", registerPost(db));
app.use("/map_fav", map_fav(db));



// Home page
app.get("/", (req, res) => {
  const userId = req.cookies.user_id;
  const templateVars = {
    userId
  }
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


