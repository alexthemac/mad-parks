const express = require('express');
const router  = express.Router();
const { insertFavMap } = require('../database.js');

const map_fav = function (db) {
  router.post("/", (req, res) => {

    //Get userId from cookie
    const userId = req.cookies.user_id;
    const mapId = req.params.id;

    console.log('mapid', mapId);

    insertFavMap(userId, mapId, db).then((result) => {
      console.log('Another one!', result);
      res.redirect(`/maps/${mapId}`);
    });
  });
  return router;
};

module.exports = map_fav;
