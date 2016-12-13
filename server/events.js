'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

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

module.exports = eventRoutes

// Epilogue will automatically create standard RESTful routes
