'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const Charity = db.define('charities', {
	name: { 
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type:Sequelize.STRING,
		validate: {
			isEmail: true,
			notEmpty: true,
		}
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING
	}

})

module.exports = Charity
