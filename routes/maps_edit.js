const express = require("express");
const router = express.Router();
const {
  getAllParks,
  getParksForFilterWithMapId,
  getMapsWithMapId
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
          parksFilteredArray : parksFilter(values[1])
        };
        res.render("maps_edit", templateVars);
      }
    );
  });
  return router;
};

//Exports for use in server.js
module.exports = { mapsEditGet };
