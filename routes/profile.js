const express = require("express");
const router = express.Router();
const {
  getParksWithCreatorId,
  getMapsWithCreatorId,
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
    ]).then((values) => {
      console.log("values[0]:  ", values[0]);
      console.log("values[1]:  ", values[1]);

      const templateVars = {
        userId,
        parksArray: values[1],
        mapsArray: values[0],
      };
      res.render("user_profile", templateVars);
    });
  });

  return router;
};
