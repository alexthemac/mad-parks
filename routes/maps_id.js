const express = require('express');
const router  = express.Router();
const {getParksWithMapId} = require('../database.js');

module.exports = (db) => {
  router.get("/:id", (req, res) => {

    //Get userId from cookie
    const userId = req.cookies.user_id;
    const mapId = req.params.id

    getParksWithMapId(mapId, db)
    .then((result) => {

      console.log(result);

      //Store array from query in templateVars
      const templateVars = {
        userId,
        mapId,
        parksArray: result
      };

      res.render('maps_id', templateVars);

    })

  });

  return router;
};
