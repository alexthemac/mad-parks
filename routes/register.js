const express = require("express");
const router = express.Router();
const { getUserWithEmailOrName, addUserToUsers } = require("../database.js");

const registerGet = function (db) {
  router.get("/", (req, res) => {
    const userId = req.cookies.user_id;

    const templateVars = {
      userId,
    };
    res.render("register", templateVars);
  });
  return router;
};

const registerPost = function (db) {
  router.post("/", (req, res) => {
    //Grab email and password entered into form
    const userName = req.body["name"];
    const email = req.body["email"];
    const password = req.body["password"];
    const confirmedPassword = req.body["confirmedPassword"];

    //Display error if email is blank or password is blank
    if (!email || !password || !userName || !confirmedPassword) {
      return res
        .status(400)
        .send(
          `One of the fields is blank. Please <a href='/register'>try again</a>`
        );
    }

    //Display error if password and confirmed password do not match
    if (password != confirmedPassword) {
      return res
        .status(400)
        .send(
          `Passwords do not match. Please <a href='/register'>try again</a>`
        );
    }

    //Checks to see if user name or email already registered
    getUserWithEmailOrName(userName, email, db).then((result) => {
      //If not already registered, send to entered info to db
      if (!result) {
        addUserToUsers(userName, email, password, db).then(() =>
          //Redirect to login once user has been registered
          res.redirect("/login")
        );
        return;
      }
      //If user name or email already registered, display error message page
      return res
        .status(400)
        .send(
          `User name or email already registered. Please <a href='/register'>try again</a>`
        );
    });
  });
  return router;
};

//Exports for use in server.js
module.exports = { registerGet, registerPost };
