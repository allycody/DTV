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
      name:'Oxfam Event 1',
      description:'Oxfams annual fundraiser',
      date:'12/12',
      location:{type: 'Point', coordinates: [40.705691, -74.009342]},
      image:'/url',
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
