-- Returns park id, park name, coordinates_long and coordinates_lat
SELECT parks.id as parks_id, park_name, maps.id as maps_id, maps.name as maps_name, coordinates_long, coordinates_lat
FROM parks
JOIN maps ON maps.id = map_id
WHERE maps.id = 14;
-- replace where with desired map pulled from xxx:
