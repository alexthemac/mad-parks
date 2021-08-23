const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;
    const templateVars = {
      userId,
    };

    res.render("maps_new", templateVars);
  });
  return router;
};
