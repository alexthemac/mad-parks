const express = require("express");
const router = express.Router();
const { getAllMaps, getUserWithId } = require("../database.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    //List all the maps that have been created
    getAllMaps(db)
    .then ((result) => {

      //Pass in username and display username in header if logged in
      getUserWithId(userId, db)
      .then((resultName) => {
        if (resultName) {
          const userName = resultName["name"];
          const templateVars = {
            userId,
            mapsArray: result,
            userName
          };
          res.render("maps", templateVars);
        }

        //Pass in blank username if user is not logged in
        const userName = '';
        const templateVars = {
          userId,
          mapsArray: result,
          userName
        };
        res.render("maps", templateVars);
        })
    })
  });
  return router;
};
