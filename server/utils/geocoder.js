// import NodeGeocoder from 'node-geocoder'
const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'mapquest',

  httpAdapter: 'https',
  apiKey: '8yPViJ7jPdorqvpZk9e4oRxFHlVoMG92', // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
}

const geocoder = NodeGeocoder(options)
module.exports = geocoder
