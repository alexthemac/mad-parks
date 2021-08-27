const express = require("express");
const router = express.Router();

const logoutPost = function (db) {
  router.post("/", (req, res) => {

    res.clearCookie("user_id");
    res.redirect("maps");

  });
  return router;
};

//Exports for use in server.js
module.exports = logoutPost;
