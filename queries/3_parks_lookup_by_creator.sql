-- Returns park id, park name, coordinates_long and coordinates_lat
SELECT parks.id as park_id, park_name, creator_id, users.name as creator_name, coordinates_long, coordinates_lat
FROM parks
JOIN users ON users.id = creator_id
WHERE creator_id = 5;
-- replace where with desired park pulled from logged in userid cookie:
