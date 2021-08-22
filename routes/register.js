const express = require('express');
const router  = express.Router();

const { getUserByEmail} = require('../helpers');

const registerGet = function (db) {
  router.get("/", (req, res) => {

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
    res.render('register', templateVars);
  });
  return router;
}

//Use module export instead..
const users = {
  "userA": {
    id: "idUserA",
    email: "a@a.com",
    password: "a"
  },
 "userB": {
    id: "idUserB",
    email: "b@b.com",
    password: "b"
  }
}

//!!!Need to update with users from DB as opposed to users object!!!///
const registerPost = function (db) {
  router.post("/", (req, res) => {
    //Grab email and password entered into form
    const email = req.body['email'];
    const password = req.body['password'];
    const newUser = req.body['name']
    const id = "id" + newUser; //TEMPORARY


    // const id = generateRandomString(); //Creates a unique id for the new user

    //Display error if email is blank or password is blank
    if (!email || !password) {
      //Send status code and display error message with one line:
      return res.status(400).send(`Not a valid email or password. Please <a href='/register'>try again</a>`);
    }
    //Display error if email is already in user "database"
    if (getUserByEmail(email, users)) {
      //Send status code and display error message with one line:
      return res.status(400).send(`Email already exists. Please <a href='/login'>login</a>`);
    }
    //TEMPORARY Adds the new created user to the users object
    users[newUser] = {
      id,
      email,
      password
    };

    console.log(users);

    //Sets a user_id cookie to the newly created id
    res.cookie('user_id', id); //Might be an issue if there is already a cookie? Maybe overwrites it?
    res.redirect('/profile');
  })
  return router;
}

//Exports for use in server.js
module.exports = {registerGet, registerPost};
