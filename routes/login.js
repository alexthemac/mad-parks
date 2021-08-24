const express = require("express");
const router = express.Router();

// const { getUserByEmail, getUserPassword } = require("../helpers");
const { getUserWithEmail } = require('../database.js');

const loginGet = function (db) {
  router.get("/", (req, res) => {

    const userId = req.cookies.user_id;

    if (userId) {
      return res.redirect(`/profile`);
    }

    const templateVars = {
      userId,
    };

    res.render("login", templateVars);
  });
  return router;
};


const users = {
  userA: {
    id: "1",
    email: "a@a.com",
    password: "a",
  },
  userB: {
    id: "2",
    email: "b@b.com",
    password: "b",
  },
};

//!!!Need to update with users from DB as opposed to users object!!!///
const loginPost = function (db) {
  router.post("/", (req, res) => {
    //Grab email and password entered into form
    const email = req.body["email"];
    const password = req.body["password"];

    //Display error if email is blank or password is blank
    if (!email || !password) {
      return res.status(400).send(`One of the fields is blank. Please <a href='/login'>try again</a>`);
    };

    //Checks to see if email in DB
    getUserWithEmail(email, db)
    .then((result) => {

      //If email not in DB, tell them to retry login
      if(!result) {
        return res.status(400).send(`Email has not been registered. Please <a href='/login'>try again</a>`);
      }

      //If password does not match DB password, tell them to retry login
      if (result.password != password) {
        return res.status(400).send(`Password does not match our records. Please <a href='/login'>try again</a>`);
      }

      //If everything matches DB, set cookie and redirect to profile
      res.cookie("user_id", result.id);

      res.redirect("/profile");

    });

  });

  return router;
};
//Exports for use in server.js
module.exports = { loginGet, loginPost };
