const express = require('express');
const router  = express.Router();
const { getParksWithMapId, getUserWithId } = require('../database.js');

module.exports = (db) => {
  router.get("/:id", (req, res) => {

    //Get userId from cookie
    const userId = req.cookies.user_id;
    const mapId = req.params.id

    //DB query to get all parks associated with the mapID in the URL
    getParksWithMapId(mapId, db)
    .then((result) => {

      //Get creator ID from maps returned by getParksWithMapId. This removes the edit button if the logged in user is not the map creator via logic in maps_id.ejs.
      let creatorId = null;
      if (result) {
        creatorId = result[0]["map_creator"];
      };

      //Get user info from the user ID in the cookie
      getUserWithId(userId, db)
      .then((resultName)=>{

        //If there is a user logged in, pass in the username along with other variables
        if (resultName) {
          const userName = resultName["name"];

          const templateVars = {
            userId,
            mapId,
            parksArray: result,
            userName,
            creatorId
          };
          res.render('maps_id', templateVars);
        }

        //If there is no user logged in, pass a blank username along with other variables
        const userName = '';
        const templateVars = {
          userId,
          mapId,
          parksArray: result,
          userName,
          creatorId
        };
        res.render('maps_id', templateVars);
      })
    })
  });
  return router;
};


