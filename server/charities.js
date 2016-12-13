'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const charityRoutes = require('express').Router() 

// Custom routes go here.
const Charity = db.models.charities

charityRoutes.get('/', function(req, res, next){
	Charity.findAll()
	.then(charities => {
		res.status(200).json(charities)
	})
	.catch(next)
})


module.exports = charityRoutes

// Epilogue will automatically create standard RESTful routes
