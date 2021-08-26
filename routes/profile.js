const express = require("express");
const router = express.Router();
const {
  getParksWithCreatorId,
  getMapsWithCreatorId,
  getFavorites
} = require("../database.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    //Get userId from cookie
    const userId = req.cookies.user_id;

    if (!userId) {
      return res.redirect("login");
    }

    Promise.all([
      getMapsWithCreatorId(userId, db),
      getParksWithCreatorId(userId, db),
      getFavorites(userId, db),
    ]).then((values) => {
      console.log("values[0]:  ", values[0]);
      console.log("values[1]:  ", values[1]);
      console.log("values[2]:  ", values[2]);

      const templateVars = {
        userId,
        mapsArray: values[0],
        parksArray: values[1],
        favsArray: values[2]
      };
      res.render("user_profile", templateVars);
    });
  });

  return router;
};
