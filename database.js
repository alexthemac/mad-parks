const getUserWithEmail = function (email, db) {
  //Define query
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [email])
      .then((result) => {
        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows[0];
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getUserWithId = function (id, db) {
  //Define query
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        // console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows[0];
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getParksWithCreatorId = function (id, db) {
  //Define query
  const queryString = `
  SELECT parks.id as park_id, park_name, creator_id, users.name as creator_name, coordinates_long, coordinates_lat
  FROM parks
  JOIN users ON users.id = creator_id
  WHERE creator_id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        // console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getParksWithMapId = function (id, db) {
  //Define query
  const queryString = `
  SELECT parks.id as park_id, park_name, maps.id as map_id, maps.name as map_name, coordinates_long, coordinates_lat
  FROM parks
  JOIN maps ON maps.id = map_id
  WHERE maps.id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getParkWithParksId = function (id, db) {
  //Define query
  const queryString = `
  SELECT parks.id as parks_id, park_name, coordinates_long, coordinates_lat street_address, city, province, coordinates_long, coordinates_lat, description, basketball_nets, tennis_courts, soccer_nets, skatepark, workout_equipment, bathrooms, water_fountain, dog_park
  FROM parks
  WHERE parks.id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {
        // console.log(result.rows[0])

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getMapsWithCreatorId = function (id, db) {
  //Define query
  const queryString = `
  SELECT maps.id as map_id, maps.name as map_name, creator_id, description, users.name as creator_name
  FROM maps
  JOIN users ON users.id = creator_id
  WHERE creator_id = $1;
  `;
  return (
    db
      .query(queryString, [id])
      .then((result) => {

        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the object for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const getUserWithEmailOrName = function (name, email, db) {
  //Define query
  const queryString = `
  SELECT *
  FROM users
  WHERE name = $1 OR email = $2
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [name, email])
      .then((result) => {
        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the array for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
};

const addUserToUsers = function (name, email, password, db) {
  //Define query
  const queryString = `
  INSERT INTO users
  (name, email, password)
  VALUES
  ($1, $2, $3)
  RETURNING *;
  `;

  //Return promise for query
  return (
    db
      .query(queryString, [name, email, password])
      .then((result) => {
        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the array for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
}

const addParkToParks = function (park, db) {
  //Define values
  const values = [
    park.park_name,
    park.street_address,
    park.city,
    park.province,
    park.description,
    park.coordinates_long,
    park.coordinates_lat,
    park.basketball_nets,
    park.tennis_courts,
    park.soccer_nets,
    park.skatepark,
    park.workout_equipment,
    park.bathrooms,
    park.water_fountain,
    park.dog_park,
    park.creator_id,
    park.map_id
  ]

  //Define query
  const queryString = `
  INSERT INTO parks (
  park_name,
  street_address,
  city,
  province,
  description,
  coordinates_long,
  coordinates_lat,
  basketball_nets,
  tennis_courts,
  soccer_nets,
  skatepark,
  workout_equipment,
  bathrooms,
  water_fountain,
  dog_park,
  creator_id,
  map_id
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
  RETURNING *;
  `;

  //Return promise for query
  return (
    db
      .query(queryString, values)
      .then((result) => {
        //If result is not found inside DB, return null
        if (result.rows.length === 0) {
          return null;
        }
        //If result is found, return the array for the user
        return result.rows;
      })
      //Console log error if can't connect to DB
      .catch((err) => {
        console.log(err.message);
      })
  );
}

module.exports = {
  getUserWithEmail,
  getUserWithId,
  getParksWithCreatorId,
  getParksWithMapId,
  getMapsWithCreatorId,
  getParkWithParksId,
  getUserWithEmailOrName,
  addUserToUsers,
  addParkToParks
};
