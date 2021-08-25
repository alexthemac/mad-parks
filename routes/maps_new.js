const express = require("express");
const router = express.Router();
const { getAllParks } = require("../database.js");


const mapsNewGet = function (db) {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    getAllParks(db).then((result) => {
      console.log(`\n INSIDE MAPS>JS ${JSON.stringify(result)}`);

      const templateVars = {
        userId,
        parksArray: result,
      };

      res.render("maps_new", templateVars);
    });
  });
  return router;
};

const mapsNewPost = function (db) {
  router.post("/", (req, res) => {

    console.log("NEW MAP CREATED (NOT REALLY JUST PLACEHOLDER")
    // console.log(JSON.stringify(req.body));
    // console.log(req.body['map']);
    console.log(req.body);

  });
  return router;
};



//Exports for use in server.js
module.exports = { mapsNewGet, mapsNewPost };


