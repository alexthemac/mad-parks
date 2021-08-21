const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.cookie("login route", 2)
    // res.clearCookie('test cookie') this is how you clear a cookie.

    const templateVars = {




    }
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
    res.render('login', templateVars);
  });
  return router;
};
