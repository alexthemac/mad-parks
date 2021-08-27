const express = require("express");
const router = express.Router();
const { getAllParks, addMapToMaps, getCurrentParkInfo, addParkToParks, getUserWithId} = require("../database.js");

const mapsNewGet = function (db) {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    getAllParks(db)
    .then((result) => {

      getUserWithId(userId, db)
      .then((resultName) => {

        const userName = resultName["name"];
        const templateVars = {
          userId,
          parksArray: result,
          userName
        };
        res.render("maps_new", templateVars);
      })
    });
  });
  return router;
};

const mapsNewPost = function (db) {
  router.post("/", (req, res) => {

    const creator_Id = req.cookies.user_id;
    const map_name = req.body['map_name'];
    const map_description = req.body['map_description'];

    //Add the newly created map to the maps table
    addMapToMaps(map_name, map_description, creator_Id, db)
    .then((result) => {

      //Store the newly created map id (used to update parkInfo map_id value)
      const mapID = result[0]['id'];

      // Loop through each property from req.body and only grab the parks that are check marked
      for (const property in req.body) {
        if (property != 'map_name' && property != 'map_description') {

          const bodyParkId = property;

          // Grab the current parks info from the DB
          getCurrentParkInfo(bodyParkId, db)
          .then((result) => {
            const parkInfo = result;
            //Update parkInfo map id key from null to map id from the newly created map
            parkInfo['map_id'] = mapID;
            addParkToParks(parkInfo, db);
          })
        }
      }
      setTimeout(() => res.redirect(`/maps/${mapID}`), 100);
    })
  });
  return router;
};

//Exports for use in server.js
module.exports = { mapsNewGet, mapsNewPost };


