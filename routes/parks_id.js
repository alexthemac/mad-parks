const express = require('express');
const router = express.Router();
const {getParkWithParksId, getUserWithId} = require('../database.js');

module.exports = (db) => {

  router.get("/:id", (req, res) => {

    const userId = req.cookies.user_id;
    const parkId = req.params.id;

    getParkWithParksId(parkId, db)
      .then((result) => {

        // console.log(result[0]);

        getUserWithId(userId, db)
        .then((resultName)=>{

          const userName = resultName["name"];

          //Store array from query in templateVars
          const templateVars = {
            userId,
            parkId,
            park: result[0],
            userName
          };
          res.render('parks_id', templateVars);
          })
      });
    });
    return router;
  };
