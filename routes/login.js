const express = require('express');
const router  = express.Router();

const { getUserByEmail, getUserPassword, getUserID } = require('../helpers');
const users = require('../servers'); //Replace with database stuff once ready.


const loginGet = function (db) {
  router.get("/", (req, res) => {
    // res.cookie("login route", 2)
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
}

const loginPost = function (db) {
  router.post("/", (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
    const currentUser = getUserByEmail(email, users);

    //Displays error if email has not been registered
    if(!currentUser) {
      //Send status code and display error message with one line:
      return res.status(403).send(`Email not registered. Please <a href='/register'>register</a> or <a href='/login'>try againn</a>`);
    }

    //Displays error if email has been registered, but wrong password is entered
    if (currentUser && getUserPassword(currentUser, users) !== password) {
      //Send status code and display error message with one line:
      return res.status(403).send(`Password does not match records. Please <a href='/login'>try again</a>`);
    }

    //If the email has been registered and password is correct, update cookie with user_id to id of email entered
    const id = getUserID(currentUser);
    //Sets a user_id cookie to the login id
    res.cookie('user_id', id);
    res.redirect('/profile'); //???? this might be a problem
  })
}

module.exports = {loginGet, loginPost};
