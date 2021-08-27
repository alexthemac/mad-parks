 SELECT id, park_name, map_id
  FROM parks
  WHERE id = 12 AND map_id is NULL;


  SELECT parks.id as park_id, park_name, maps.id as map_id, maps.name as map_name, coordinates_long, coordinates_lat, maps.description as description, maps.creator_id as map_creator
  FROM parks
  JOIN maps ON maps.id = map_id
  ;
