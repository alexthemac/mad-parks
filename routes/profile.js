const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    const userId = req.cookies.user_id;
    const templateVars = {
      userId,
    };

    /////
    //Query db for maps associated with this profile
    ////

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
    res.render("user_profile", templateVars);
  });
  return router;
};
