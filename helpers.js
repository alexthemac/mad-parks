//Check if email is already in user "database"
const getUserByEmail = function(email, database) {
  for (const user in database) {
    if (email === database[user]['email']) { //update this to actually use DB as opposed to user object
      return database[user];
    }
  }
};

//Get user password from "database"
const getUserPassword = function(user, database) {
  if (user) {
    return user['password']; //update this to actually use DB as opposed to user object
  }
  console.log("User not in database");
  return null;
};

module.exports = { getUserByEmail, getUserPassword};
