const express = require("express");
const router = express.Router();



const logoutPost = function (db) {
  router.post("/", (req, res) => {

    res.clearCookie("user_id");
    const userId = req.cookies.user_id;

    const templateVars = {
      userId,
    };

    res.render("maps", templateVars);
  });
  return router;
};

//Exports for use in server.js
module.exports = logoutPost;
