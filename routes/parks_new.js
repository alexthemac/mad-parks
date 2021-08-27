const express = require('express');
const router  = express.Router();
const { addParkToParks, getUserWithId } = require('../database.js');

const parksNewGet = function (db) {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    //Redirect to login if user not logged in. Only logged in users can create parks
    if (!userId) {
      return res.redirect("../login");
    }

    //Pass in username and display username in header if logged in
    getUserWithId(userId, db)
    .then((result)=>{

      const userName = result["name"];
      const templateVars = {
        userId,
        userName
      };
      res.render('parks_new', templateVars);
    })
  });
  return router;
}

const parksNewPost = function (db) {
  router.post("/", (req, res) => {

    //For checking errors if text field is left empty
    const park_name = req.body['park_name'];
    const street_address = req.body['street_address'];
    const city = req.body['city'];
    const province = req.body['province'];
    const park_image = req.body['park_image'];
    const description = req.body['description'];
    const coordinates_long = req.body['coordinates_long'];
    const coordinates_lat = req.body['coordinates_lat'];

    //Create object of data from form. Define false for all toggles to start
    let parkDataObj = {
      basketball_nets: false,
      tennis_courts: false,
      soccer_nets: false,
      skatepark: false,
      workout_equipment: false,
      bathrooms: false,
      water_fountain: false,
      dog_park: false,
      creator_id: req.cookies.user_id,
      map_id: null, //When creating new map, only null map id parks are displayed (prevents duplicates)
    }

    //Add text fields from req.body to parkDataObj
    for (const bodyProperty in req.body) {
      parkDataObj[bodyProperty] = req.body[bodyProperty]
    }

    //Replace all 'on' with true (switches return on instead of true, we want true in DB)
    for (const parkProperty in parkDataObj) {
      if (parkDataObj[parkProperty] === 'on') {
        parkDataObj[parkProperty] = true;
      }
    }

    //Display error if any field is blank
    if (!park_name || !street_address || !city || !province || !park_image || !description || !coordinates_long || !coordinates_lat) {
      return res.status(400).send(`One of the fields is blank. Please <a href='/parks/new'>try again</a>`);
    };

    //Add park info to park DB then redirect to profile.
    addParkToParks(parkDataObj, db)
    .then((result) => {
      res.redirect("/profile");
    })
  });
  return router;
}

//Exports for use in server.js
module.exports = {parksNewGet, parksNewPost};
