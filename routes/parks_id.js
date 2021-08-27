const express = require("express");
const router = express.Router();
const { getParkWithParksId, getUserWithId } = require("../database.js");

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const userId = req.cookies.user_id;
    const parkId = req.params.id;

    //Get all parks where maps id is null. This will only show created parks, and not duplicate the parks. (each park is in park table multiple times with different map id for each map it's on)
    getParkWithParksId(parkId, db).then((result) => {
      //Pass in username and display username in header
      getUserWithId(userId, db).then((resultName) => {
        const userName = resultName["name"];

        //Store array from query in templateVars
        const templateVars = {
          userId,
          parkId,
          park: result[0],
          userName,
        };
        res.render("parks_id", templateVars);
      });
    });
  });
  return router;
};
