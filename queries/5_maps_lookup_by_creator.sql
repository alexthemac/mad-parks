SELECT maps.id as map_id, maps.name as maps_name, creator_id, description, users.name as creator_name
FROM maps
JOIN users ON users.id = creator_id
WHERE creator_id = 5;
