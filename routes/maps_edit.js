const express = require("express");
const router = express.Router();
const {
  getAllParks,
  getParksForFilterWithMapId,
  getMapsWithMapId,
  dropParkWithMapIdandParkId,
  getCurrentParkInfo,
  getCheckedParksWithMapId,
  getParksWithMapId,
  addParkToParks
} = require("../database.js");

const parksFilter = (result) => {
  let checkBoxArray = [];
  for (const res of result) {
    if (res["map_id"]) {
      checkBoxArray.push(res);
    }
  }
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

    Promise.all([
      getAllParks(db),
      getParksForFilterWithMapId(mapId, db),
      getMapsWithMapId(mapId, db)
      ]).then(
      (values) => {
        // console.log("\nALL PARKS:  ", values[0]);
        // console.log("\n PARKS:  ", values[1]);
        // console.log("\n MAP:  ", values[2]);

        // console.log(
        //   "\n LOOK HERE\nwhat is returned from promise all/func: ",
        //   parksFilter(values[1])
        // );

        const templateVars = {
          userId,
          mapName : values[2].name,
          mapDesc : values[2].description,
          parksFilteredArray : parksFilter(values[1]),
          mapId
        };
        res.render("maps_edit", templateVars);
      }
    );
  });
  return router;
};

const mapsEditPost = function (db) {
  router.post("/:id", (req, res) => {

    const creator_Id = req.cookies.user_id;

    const map_id = req.params.id;

    // console.log(creator_Id, map_id);

    // const map_name = req.body['map_name'];
    // const map_description = req.body['map_description'];

    //Drop all parks associated with the map_id.

    const dropTheseParksArray = [];

    const checkedParksArray = Object.keys(req.body);

    console.log("checked keys:", checkedParksArray);

    getParksWithMapId(map_id, db)
    .then((result) => {
      console.log(result)

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
      console.log("droptheseParks:", dropTheseParksArray);

      for (const dropThisPark of dropTheseParksArray) {

        dropParkWithMapIdandParkId(map_id, dropThisPark['park_id'], db)

      }
    })
    .then(() => {
     //NOW WE HAVE dropped the unchecked ones, now we need to add the checked ones.

      // Loop through each property from req.body and only grab the parks that are check marked
      for (const property in req.body) {
        if (property != 'map_name' && property != 'map_description') {

          const bodyParkId = property;

          // Grab the current parks info from the DB
          getCurrentParkInfo(bodyParkId, db)
          .then((result) => {
            if (result) {
              // console.log("getCurrentParkInfo result:",result)
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
     // res.redirect(`/maps/${map_id}`)
  });
  return router;
}

//Exports for use in server.js
module.exports = { mapsEditGet, mapsEditPost };
