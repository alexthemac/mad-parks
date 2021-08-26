const express = require("express");
const router = express.Router();
const { getAllMaps, getUserWithId } = require("../database.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    getAllMaps(db)
    .then ((result) => {
      console.log(`\n INSIDE MAPS>JS ${JSON.stringify(result)}`);

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
        const userName = 'Not logged in';
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
