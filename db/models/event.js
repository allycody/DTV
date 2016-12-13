'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const Event = db.define('events', {
	name: { 
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	date: {
		type:Sequelize.TEXT,
		allowNull: false
	},
	location: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	training: {
		type: Sequelize.ARRAY(Seqeulize.STRING)
	},
	image: {
		type: Sequelize.STRING
	},
	numNeeded: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	urgent: {
		type: Sequelize.BOOLEAN
	},
	category: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	}

})

module.exports = Event
