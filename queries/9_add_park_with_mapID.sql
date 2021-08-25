INSERT INTO parks (
  park_name,
  street_address,
  city,
  province,
  park_image,
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
  SELECT
  park_name,
  street_address,
  city,
  province,
  park_image,
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
  FROM parks WHERE id=1;
  UPDATE parks SET map_id = 1 WHERE id = (select MAX(id) FROM parks);

-- INSERT INTO parks (
--   park_name,
--   street_address,
--   city,
--   province,
--   park_image,
--   description,
--   coordinates_long,
--   coordinates_lat,
--   basketball_nets,
--   tennis_courts,
--   soccer_nets,
--   skatepark,
--   workout_equipment,
--   bathrooms,
--   water_fountain,
--   dog_park,
--   creator_id,
--   map_id
--   )
--   SELECT
--   park_name,
--   street_address,
--   city,
--   province,
--   park_image,
--   description,
--   coordinates_long,
--   coordinates_lat,
--   basketball_nets,
--   tennis_courts,
--   soccer_nets,
--   skatepark,
--   workout_equipment,
--   bathrooms,
--   water_fountain,
--   dog_park,
--   creator_id,
--   map_id
--   FROM parks WHERE id=$1;
  -- UPDATE parks SET map_id = $2 WHERE id = (select MAX(id) FROM parks);
