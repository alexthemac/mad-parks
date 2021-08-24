const express = require('express');
const router  = express.Router();
const { getUserWithId } = require('../database.js');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;
    const user = getUserWithId(userId, db)
    .then((result) => {

      console.log(`\n USERNAME: ${JSON.stringify(result)}`);
    })

    const templateVars = {
      userId,
    };

    res.render('maps', templateVars);
  });
  return router;
};


