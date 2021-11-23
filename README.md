# Mad Parks

## About

Mad Parks is a full stack web app for storing local park information and for providing local park recommendations to users. Utilizes the Leaflet map api. 

Users can create an account, login, create parks, create maps, add parks to maps and favorite maps. 

A map is a collection of parks that have a common theme. An example of a map would be "Parks for Hammocking" which would be a collection of parks that have good trees to set up a hammock. 

In addition, there are public maps that do not require a user to login that are visible to all users. 

Most of the park and map data is made up for the purpose of the project. Some of the parks data does match some real parks

## Key Features: 

* Leaflet api used for maps
* EJS templates
* Express
* PostgreSQL database

# Main frameworks/libraries used:

* `Node.js`
* `EJS`
* `Express`
* `PostgreSQL` 
* `API: Leaflet`

# Functionality Demonstration:

## Login and view maps

![Login](/public/gifs/LoginAndViewMaps.gif)

## Create parks

![CreatePark](/public/gifs/CreatePark.gif)

## Add park to map and favorite map

![AddPark](/public/gifs/AddParkToMapAndFavoriteMap.gif)

## Project Setup

1. Clone repository in your local folder: 
`git clone git@github.com:burhansyd/mad-parks.git`
1. Switch into projects folder: `cd mad-parks`
1. Install all dependencies: `npm install`
1. Fix to binaries for sass: `npm rebuild node-sass`
1. Use `.env.example` file as a template to create `.env` file which should contain your set-up for a newly created database. Save it in the same folder as `.env.example`
1. Register for map api access token at https://account.mapbox.com/auth/signin/?route-to=%22https://account.mapbox.com/access-tokens/%22.
1. Set map_token={access token goes here} in the newly create `.env` file.
1. Create a new database using PostgreSQL. 
    * Refer to `.env` file for db name, user name and password to be used.
    * db name, user name and password can be changed if you like, but make sure to update the `.env` with the changes.
1. Create tables and seed tables via: `npm run db:reset`
1. Run the server via `npm start`
1. Visit `http://localhost:3000/`
