-- !!!!PROBABLY NOT NEEDED NOW!!!!
-- SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users));

INSERT INTO users (name, email, password)
VALUES ('mike', 'mike@mike.com', 'mike');
