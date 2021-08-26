const express = require('express');
const router  = express.Router();

const { addParkToParks } = require('../database.js');


const parksNewGet = function (db) {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    //Redirect to login if user not logged in. Only logged in users can create parks
    if (!userId) {
      return res.redirect("../login");
    }

    const templateVars = {
      userId,
    };

    res.render('parks_new', templateVars);
  });
  return router;
}

const parksNewPost = function (db) {
  router.post("/", (req, res) => {

    const park_name = req.body['park_name'];
    const street_address = req.body['street_address'];
    const city = req.body['city'];
    const province = req.body['province'];
    const park_image = req.body['park_image'];
    const description = req.body['description'];
    const coordinates_long = req.body['coordinates_long'];
    const coordinates_lat = req.body['coordinates_lat'];

    //Define false for all toggles
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
      map_id: null, //REPLACE WITH MAP ID
    }

    //Add text fields from req.body to parkDataObj
    for (const bodyProperty in req.body) {
      parkDataObj[bodyProperty] = req.body[bodyProperty]
    }

    //Replace all 'on' with true
    for (const parkProperty in parkDataObj) {
      if (parkDataObj[parkProperty] === 'on') {
        parkDataObj[parkProperty] = true;
      }
    }

    //Display error if email is blank or password is blank
    if (!park_name || !street_address || !city || !province || !park_image || !description || !coordinates_long || !coordinates_lat) {
      return res.status(400).send(`One of the fields is blank. Please <a href='/parks/new'>try again</a>`);
    };

    // //PASS TOGGLE VALUES ONCE FIGURE OUT TOGGLE
    // //CHECK TO SEE IF PARK WAS ALREADY ADDED OR NOT....BY NAME? BY COORDINATES?
    addParkToParks(parkDataObj, db)
    .then((result) => {
      console.log(result)
    })
    // res.redirect("profile")
  });
  return router;
}



//Exports for use in server.js
module.exports = {parksNewGet, parksNewPost};
