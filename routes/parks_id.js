const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {

    const userId = req.cookies.user_id;
    const parkId = req.params.id;

    const templateVars = {
      userId,
      parkId
    };

    getParksWithMapId(mapId, db)
      .then((result) => {

        console.log(result);

        //Store array from query in templateVars
        const templateVars = {
          userId,
          mapId,
          parksArray: result
        };
        res.render('parks_id', templateVars);
      });
    });
    return router;
  };
