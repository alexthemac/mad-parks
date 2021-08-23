-- Returns all park info and creators name
SELECT parks.*, users.name as creator_name
FROM parks
JOIN users ON users.id = creator_id
WHERE park_name= 'Cefprozil';
-- replace where with desired park name:
