const db = require('APP/db')
const Event = require('./models/event')
const Charity = require('./models/charity')


const seedCharities = () => db.Promise.map([
  {name: 'Oxfam', email: 'Oxfam@dtf.com', image:'/empty',location: {type: 'Point', coordinates: [40.705691, -74.009342]}},
  {name: 'Unicef', email: 'Unicef@dtf.com', image:'/empty',location: {type: 'Point', coordinates: [40.705691, -74.009342]}},
], charities => db.model('charities').create(charities))

const seedEvents = () => {
  let globalCharity;
  Charity.findById(1)
  .then(charity => {
    globalCharity = charity
    return Event.create({
      name:'BBB Charity',
      description:'Because of BBB',
      date:'12/12',
      location:{type: 'Point', coordinates: [40.705691, -74.009342]},
      image:'bbb.jpg',
      numNeeded:100,
      urgent:true,
      category:['fundraiser,outdoors']
    })
  })
  .then(event => {
    globalCharity.addEvent(event)
  })
  .then(() => {
    return Event.create({
      name:'Charity Water',
      description:'We need more water',
      date: Date.now(),
      location:{type: 'Point', coordinates: [40.705691, -74.009342]},
      image:'charitywater.jpg',
      numNeeded:100,
      urgent:true,
      category:['fundraiser,outdoors']
    })
  })
  .then(event => {
    globalCharity.addEvent(event)
  })
  .then(() => {
    return Event.create({
      name:'Trees Charity',
      description:'We love trees',
      date: Date.now(),
      location:{type: 'Point', coordinates: [40.705691, -74.009342]},
      image:'trees.jpg',
      numNeeded:100,
      urgent:true,
      category:['fundraiser,outdoors']
    })
  })
  .then(event => {
    globalCharity.addEvent(event)
  })
  .then(() => {
    return Event.create({
      name: 'Yoga for Charity',
      description:'Likeminded yoga ninjas',
      date: Date.now(),
      location:{type: 'Point', coordinates: [40.705691, -74.009342]},
      image:'yoga.jpg',
      numNeeded:100,
      urgent:true,
      category:['fundraiser,outdoors']
    })
  })
  .then(event => {
    globalCharity.addEvent(event)
  })
  .then(() => {
    return Event.create({
      name:'ART 4 CHARITY',
      description:' ',
      date: Date.now(),
      location:{type: 'Point', coordinates: [40.705691, -74.009342]},
      image:'charityart.jpg',
      numNeeded:100,
      urgent:true,
      category:['fundraiser,outdoors']
    })
  })
  .then(event => {
    globalCharity.addEvent(event)
  })
}

db.didSync
  .then(() => db.sync({force: true}))
  .then(() => seedCharities())
  .then(() => seedEvents())
  .catch(error => console.error(error))
  // .finally(() => db.close())
