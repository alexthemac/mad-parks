const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {

    const userId = req.cookies.user_id;
    const templateVars = {
      userId,
    };
    ///////////
    // db insert statment
    //////////

    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    res.render('parks_new', templateVars);
  });
  return router;
};
