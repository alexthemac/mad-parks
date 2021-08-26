const express = require("express");
const router = express.Router();
const { getAllParks, getMapsWithMapId, addMapToMaps, getCurrentParkInfo, addParkToParks} = require("../database.js");


const mapsEditGet = function (db) {
  router.get("/:id", (req, res) => {
    const userId = req.cookies.user_id;
    const mapId = req.params.id;

    // console.log(mapId);

    getAllParks(db)
    .then((parksResult) => {

      getMapsWithMapId(mapId, db)
      .then((result) => {

        //Array to send to .ejs
        let checkBoxArray = [];

        //Add all parks with map id to checkBoxArray
        for (const res of result) {
          if (res['map_id']) {
            checkBoxArray.push(res);
          }
        }

        //Avoid duplicates in checkBoxArray
        for (const res of result) {
          let add = true;
          if (!res['map_id']) {
            for (checkBox of checkBoxArray) {
              if (res['park_name'] === checkBox['park_name']) {
                add = false;
              }
            }
            if (add === true) {
              checkBoxArray.push(res)
            }
          }
        }
        console.log(checkBoxArray);


        // if park name is duplicated, only take park name with highest map_id.

        // const mapName = result['name'];
        // const mapDesc = result['description'];

        const templateVars = {
          userId,
          parksArray: parksResult
          // mapName,
          // mapDesc
        };
        // res.render("maps_edit", templateVars);
      })
    });
  });
  return router;
};

// const mapsNewPost = function (db) {
//   router.post("/", (req, res) => {

//     const creator_Id = req.cookies.user_id;
//     const map_name = req.body['map_name'];
//     const map_description = req.body['map_description'];

//     //Add the newly created map to the maps table
//     addMapToMaps(map_name, map_description, creator_Id, db)
//     .then((result) => {

//       //Store the newly created map id (used to update parkInfo map_id value)
//       const mapID = result[0]['id'];

//       // Loop through each property from req.body and only grab the parks that are check marked
//       for (const property in req.body) {
//         if (property != 'map_name' && property != 'map_description') {

//           const bodyParkId = property;

//           // Grab the current parks info from the DB
//           getCurrentParkInfo(bodyParkId, db)
//           .then((result) => {
//             const parkInfo = result;
//             //Update parkInfo map id key from null to map id from the newly created map
//             parkInfo['map_id'] = mapID;
//             addParkToParks(parkInfo, db);
//           })
//         }
//       }
//       res.redirect(`/maps/${mapID}`);
//     })
//   });
//   return router;
// };



//Exports for use in server.js
module.exports = { mapsEditGet };
