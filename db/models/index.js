'use strict';
var db = require('APP/db')

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Event = require('./event')
const Charity = require('./charity')


Charity.hasMany(Event)
Event.belongsTo(Charity)
User.belongsToMany(Event,{through:'UserEvent'})
Event.belongsToMany(User,{through:'UserEvent'})

module.exports = db;


