const express = require('express');
const router  = express.Router();
const { getParksWithMapId, getUserWithId } = require('../database.js');
const { loginGet } = require('./login.js');

module.exports = (db) => {
  router.get("/:id", (req, res) => {

    //Get userId from cookie
    const userId = req.cookies.user_id;
    const mapId = req.params.id

    getParksWithMapId(mapId, db)
    .then((result) => {

      let creatorId = null;

      if (result) {
        creatorId = result[0]["map_creator"];
      };

      getUserWithId(userId, db)
      .then((resultName)=>{

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

        const userName = '';
        const templateVars = {
          userId,
          mapId,
          parksArray: result,
          userName,
          creatorId
        };
        res.render('maps_id', templateVars);
        // console.log("result from maps_id.js: ", result);

        //Store array from query in templateVars

      })
    })

  });

  return router;
};


