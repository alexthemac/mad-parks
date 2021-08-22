//Check if email is already in user "database"
const getUserByEmail = function(email, database) {
  for (const user in database) {
    if (email === database[user]['email']) { //update this to actually use DB as opposed to user object
      return user;
    }
  }
};

//Get user password from "database"
const getUserPassword = function(user, database) {
  if (database[user]) {
    return database[user]['password']; //update this to actually use DB as opposed to user object
  }
  console.log("User not in database");
  return null;
};

//Return user_id from user "database" via email lookup
const  getUserID = function(user, database) {
  if (database[user]) {
    return database[user]['id']; //update this to actually use DB as opposed to user object
  }
  console.log("User not in database");
  return null;
};

module.exports = { getUserByEmail, getUserPassword, getUserID };
