const express = require("express");
const router = express.Router();
const { getParksWithCreatorId, getMapsWithCreatorId } = require('../database.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    //Get userId from cookie
    const userId = req.cookies.user_id;


    if (!userId) {
      return res.redirect("maps");
    }



    Promise.all([getMapsWithCreatorId(userId, db), getParksWithCreatorId(userId, db)]).then((values) => {
      console.log("is this working???")
      console.log("values[0]:  ", values[0]);
      console.log("values[1]:  ", values[1]);

      const templateVars = {
        userId,
        parksArray : values[1],
        mapsArray : values[0]
      }
      res.render('user_profile', templateVars);
    });

  //   .then((result) => {

  // let mapRes = [];

  //   getMapsWithCreatorId(userId, db)
  //   .then((result) => {



  //     // templateVars['mapsArray'] = result;
  //     mapRes = result;
  //     return result;

  //   })
  //   .then
  //   (getParksWithCreatorId(userId, db))
  //   .then((result) => {



  //     //Store array from query in templateVars
  //       const templateVars = {
  //         userId,
  //         parksArray : result,
  //         mapsArray : mapRes
  //       }
  //     res.render("user_profile", templateVars);
  //     return result;

      //we have the parks information but we need the maps information now.
    });
  // });
// });
  return router;
};
