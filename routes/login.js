const express = require("express");
const router = express.Router();

const { getUserByEmail, getUserPassword } = require("../helpers");

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

    const currentUser = getUserByEmail(email, users);

    //Displays error if email has not been registered
    if (!currentUser) {
      //Send status code and display error message with one line:
      return res
        .status(403)
        .send(
          `Email not registered. Please <a href='/register'>register</a> or <a href='/login'>try again</a>`
        );
    }

    //Displays error if email has been registered, but wrong password is entered
    if (currentUser && getUserPassword(currentUser, users) !== password) {
      //Send status code and display error message with one line:
      return res
        .status(403)
        .send(
          `Password does not match records. Please <a href='/login'>try again</a>`
        );
    }

    //If the email has been registered and password is correct, update cookie with user_id to id of email entered
    const id = currentUser["id"];

    //Sets a user_id cookie to the login id
    res.cookie("user_id", id);
    res.redirect("/profile");
  });
  return router;
};
//Exports for use in server.js
module.exports = { loginGet, loginPost };
