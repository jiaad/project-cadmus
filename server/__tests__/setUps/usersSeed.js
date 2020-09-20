const User = require('../../models/User')
const users = [{
  "name": {
    "first": "jiad",
    "last": "tusher"
  },
  "email": "negotiator@gmail.com",
  "position": "freelance",
  "isActive": true,
  "password": "azerty"
  },{
  "name": {
    "first": "jiad",
    "last": "tusher"
  },
  "email": "jiad@gmail.com",
  "position": "designer",
  "isActive": true,
  "password": "azerty"
  },{
  "name": {
    "first": "jiad",
    "last": "tusher"
  },
  "email": "jiadxli80@gmail.com",
  "position": "freelance",
  "isActive": true,
  "password": "azerty"
}]

// module.exports = {
//   userSeed() {
//     beforeEach(async () => {
//       User.create(users)
//     })
//   }
// }

module.exports = users