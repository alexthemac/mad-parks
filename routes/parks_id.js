const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {

    const userId = req.cookies.user_id;
    const parkId = req.params.id;

    const templateVars = {
      userId,
      parkId
    };
    /////////
    //query db for specifc park info
    /////////

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
    res.render('parks_id', templateVars);
  });
  return router;
};
