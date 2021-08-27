const express = require("express");
const router = express.Router();
const {
  getParksWithCreatorId,
  getMapsWithCreatorId,
  getFavorites,
  getUserWithId,
} = require("../database.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    //Get userId from cookie
    const userId = req.cookies.user_id;

    //If not logged in, redirect to login
    if (!userId) {
      return res.redirect("login");
    }

    //Display three columns on profile page: maps, parks and favorites. Maps, park and favorites displayed are specific to each user. If they created park/map or favorited a map it is displayed.
    Promise.all([
      getMapsWithCreatorId(userId, db),
      getParksWithCreatorId(userId, db),
      getFavorites(userId, db),
    ]).then((values) => {
      //Dispaly user name when logged in
      getUserWithId(userId, db).then((result) => {
        const userName = result["name"];

        const templateVars = {
          userId,
          mapsArray: values[0],
          parksArray: values[1],
          favsArray: values[2],
          userName,
        };
        res.render("user_profile", templateVars);
      });
    });
  });

  return router;
};
