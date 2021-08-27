const express = require("express");
const router = express.Router();
const {
  getParksForFilterWithMapId,
  getMapsWithMapId,
  dropParkWithMapIdandParkId,
  getCurrentParkInfo,
  getParksWithMapId,
  addParkToParks,
  getUserWithId
} = require("../database.js");

//Define function to avoid duplicating parks in the park list
const parksFilter = (result) => {
  let checkBoxArray = [];

  //Push all parks that are previously associated to the map id to checkBoxArray
  for (const res of result) {
    if (res["map_id"]) {
      checkBoxArray.push(res);
    }
  }

  //Push null parks to checkBoxArray if they are not already pushed (avoids duplicating parks in park list on edit page)
  for (const res of result) {
    let add = true;
    if (!res["map_id"]) {
      for (checkBox of checkBoxArray) {
        if (res["park_name"] === checkBox["park_name"]) {
          add = false;
        }
      }
      if (add === true) {
        checkBoxArray.push(res);
      }
    }
  }
  return checkBoxArray;
};

const mapsEditGet = function (db) {
  router.get("/:id", (req, res) => {

    const userId = req.cookies.user_id;
    const mapId = req.params.id;

    //Get all parks from the db with mapId, get map with map id.
    Promise.all([
      getParksForFilterWithMapId(mapId, db),
      getMapsWithMapId(mapId, db)
    ]).then(
      (values) => {

        //Display username in header
        getUserWithId(userId, db)
          .then((resultName) => {

            const userName = resultName["name"];

            const templateVars = {
              userId,
              mapName: values[1].name,
              mapDesc: values[1].description,
              parksFilteredArray: parksFilter(values[0]),
              mapId,
              userName
            };
            res.render("maps_edit", templateVars);
          })
      }
    );
  });
  return router;
};

const mapsEditPost = function (db) {
  router.post("/:id", (req, res) => {

    const map_id = req.params.id;

    //Define array of parks to be removed from DB
    const dropTheseParksArray = [];
    //Grab all the parks that are checked on the page when submitted
    const checkedParksArray = Object.keys(req.body);

    getParksWithMapId(map_id, db)
      .then((result) => {
        console.log(result)

        //Push parks to drop parks array if they have the map id and they are not checked on submittal
        for (const res of result) {
          let add = true;
          for (parks of checkedParksArray) {
            if (res['park_id'] == parks) {
              add = false;
            }
          }
          if (add === true) {
            dropTheseParksArray.push(res);
          }
        }

        //Drop all parks from park table that are in the dropTheseParksArray
        for (const dropThisPark of dropTheseParksArray) {
          dropParkWithMapIdandParkId(map_id, dropThisPark['park_id'], db)
        }
      })

      .then(() => {
        //Now we have dropped the unchecked ones, now we need to add the checked ones.

        // Loop through each property from req.body and only grab the parks that are check marked
        for (const property in req.body) {
          if (property != 'map_name' && property != 'map_description') {

            const bodyParkId = property;

            // Grab the current parks info from the DB
            getCurrentParkInfo(bodyParkId, db)
              .then((result) => {
                if (result) {
                  const parkInfo = result;

                  //Update parkInfo map id key from null to map id from the newly created map
                  parkInfo['map_id'] = map_id;
                  addParkToParks(parkInfo, db)
                }
              })
          }
        }
      })
    setTimeout(() => res.redirect(`/maps/${map_id}`), 100);
  });
  return router;
}

//Exports for use in server.js
module.exports = { mapsEditGet, mapsEditPost };
