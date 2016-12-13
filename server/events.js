'use strict'

const db = require('APP/db')
const geocoder = require('geocoder');
const axios = require('axios');

const eventRoutes = require('express').Router()

// Custom routes go here.
const Event = db.models.events

eventRoutes.get('/', function(req, res, next){
	Event.findAll()
	.then(events => {
		res.status(200).json(events)
	})
	.catch(next)
})

eventRoutes.get('/active', function(req, res, next){
	Event.findAll({
		where: {
			active: true
		}
	})
	.then(events => {
		res.status(200).json(events)
	})
	.catch(next)
})

eventRoutes.post('/filtered', function(req, res, next){
	console.log("REQ BODY: ", req.body)
	Event.findAll({
		where: {
			active: true,
			// add more filters 

		}
	})
})

eventRoutes.put('/:eventId/:userId', function(req, res, next){
	Event.findById(req.params.eventId)
	.then(event => {
		event.addUser(req.params.userId)
	})
})

eventRoutes.post('/location', function(req, res, next){
	console.log("IN ROUTE")
	console.log("location: ", req.body.location)
	console.log("distance: ", req.body.distance)
	const meters = parseInt(req.body.distance) * 1609.34;
	console.log("meters: ", meters)
	let coords;
	console.log("GEOCODER: ", geocoder)
	geocoder.geocode(req.body.location, function ( err, data ) {
  		console.log("IN GEOCODER")
  		if(err){
  			res.status(400).send(err)
  		}
  		else if(data.status === 'ZERO_RESULTS'){
          console.log("NO LOCATIONS IN YOUR AREA")
          throw new Error("no results")
        }
        else{
        	coords = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]
        }

	})
	.then((resp) => {
		console.log("RESP: ", resp)
		console.log("COORDS: ", coords)
		return Event.findAll({
			where: sequelize.where(sequelize.fn(
					'ST_DWithin',
					sequelize.col('events.location'), sequelize.fn('ST_GeographyFromText', `SRID=4326;${coords}`), meters), true
				)
		})
	})
	.then(events => {
		res.status(200).json(events)
	})
	.catch(err => console.log("ERROR IN LOCATION ROUTE: ", err))
})

module.exports = eventRoutes

