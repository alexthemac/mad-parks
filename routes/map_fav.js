const express = require("express");
const router = express.Router();
const { insertFavMap } = require("../database.js");

const map_fav = function (db) {
  router.post("/:id", (req, res) => {
    //Get userId from cookie
    const userId = req.cookies.user_id;
    const mapId = req.params.id;

    //Call function to insert favorited map into favorites table
    insertFavMap(userId, mapId, db).then((result) => {
      res.redirect(`/maps/${mapId}`);
    });
  });
  return router;
};

module.exports = map_fav;
