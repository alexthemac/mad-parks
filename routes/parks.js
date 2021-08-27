const express = require('express');
const router  = express.Router();
const { getUserWithId } = require('../database.js');

module.exports = (db) => {

  router.get("/", (req, res) => {

    const userId = req.cookies.user_id;

    getUserWithId(userId, db)
    .then((result)=>{

      const userName = result["name"];
      const templateVars = {
        userId,
        userName
      };
      res.render('parks', templateVars);
    })
  });
  return router;
};
