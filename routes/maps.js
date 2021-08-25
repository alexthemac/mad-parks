const express = require("express");
const router = express.Router();
const { getAllMaps } = require("../database.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    getAllMaps(db)
    .then ((result) => {
      console.log(`\n INSIDE MAPS>JS ${JSON.stringify(result)}`);

      const templateVars = {
        userId,
        mapsArray: result
      };

      res.render("maps", templateVars);
    })
  });
  return router;
};
