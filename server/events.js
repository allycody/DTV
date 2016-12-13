'use strict'

const db = require('APP/db')
const geocoder = require('geocoder');
const axios = require('axios');
const sequelize = require('sequelize')


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
	const meters = parseInt(req.body.distance) * 1609.34;
	getLocation(req.body.location)
	.then((coords) => {
		console.log("COORDS: ", coords)
		let coordString = `POINT(${coords[0]} ${coords[1]})`
		console.log("COORDS: ", coords)
		return Event.findAll({
			where: sequelize.where(sequelize.fn(
					'ST_DWithin',
					sequelize.col('events.location'), sequelize.fn('ST_GeographyFromText', `SRID=4326;${coordString}`), meters), true
				)
		})
	})
	.then(events => {
		res.status(200).json(events)
	})
	.catch(err => console.log("ERROR IN LOCATION ROUTE: ", err))
})

function getLocation(loc){
	return new Promise(function(resolve, reject) {
        geocoder.geocode(loc, function (err, data) {
          if(err) reject(err);
          resolve(data);
        })
    })
    .then(data => {
      console.log("DATA STATUS: ", data.status)
        if(data.status === 'ZERO_RESULTS'){
          console.log("data status zero")
          return "fail"
        }
        else{
          let LL = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]
          return LL
        } 
    })
    .catch(err => console.log(err))
}

module.exports = eventRoutes

