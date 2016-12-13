const db = require('APP/db')

const seedCharities = () => db.Promise.map([
  {name: 'Oxfam', email: 'Oxfam@dtf.com', image:'/empty',location:'HERE'},
  {name: 'Unicef', email: 'Unicef@dtf.com', image:'/empty',location:'HERE'},
], charities => db.model('charities').create(charities))

db.didSync
  .then(() => db.sync({force: true}))
  .then(() => seedCharities())
  .catch(error => console.error(error))    
  .finally(() => db.close())
