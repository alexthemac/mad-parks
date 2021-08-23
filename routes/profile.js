const express = require("express");
const router = express.Router();
const {getParksWithCreatorId} = require('../database.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    //Get userId from cookie
    const userId = req.cookies.user_id;


    if (!userId) {
      return res.redirect("maps");
    }
    const templateVars = {
      userId,
    };

    //Call function from database.js file
    getParksWithCreatorId(userId, db)
    .then((result) => {

      console.log(result);

      //Store array from query in templateVars
      const templateVars = {
        userId,
        parksArray: result
      };

      //Pass to user_profile
      res.render("user_profile", templateVars);
      return result;

      //we have the parks information but we need the maps information now.
    });
  });

  return router;
};
