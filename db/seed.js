const db = require('APP/db')

const seedCharities = () => db.Promise.map([
  {name: 'Oxfam', email: 'Oxfam@dtf.com', image:'/empty',location: {type: 'Point', coordinates: [40.705691, -74.009342]}},
  {name: 'Unicef', email: 'Unicef@dtf.com', image:'/empty',location:'{type: 'Point', coordinates: [40.705691, -74.009342]}},
], charities => db.model('charities').create(charities))

db.didSync
  .then(() => db.sync({force: true}))
  .then(() => seedCharities())
  .catch(error => console.error(error))    
  .finally(() => db.close())
