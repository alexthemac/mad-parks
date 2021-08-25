const express = require('express');
const router = express.Router();
const {getParkWithParksId} = require('../database.js');

module.exports = (db) => {

  router.get("/:id", (req, res) => {

    const userId = req.cookies.user_id;
    const parkId = req.params.id;

    const templateVars = {
      userId,
      parkId
    };

    getParkWithParksId(parkId, db)
      .then((result) => {

        console.log(result[0]);

        //Store array from query in templateVars
        const templateVars = {
          userId,
          parkId,
          park: result[0]
        };
        res.render('parks_id', templateVars);
      });
    });
    return router;
  };
