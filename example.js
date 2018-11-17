const timestampGroupToHumanReadable = require('./index')
const timestampGroup = [1542475793000, 1542389393000, 1542043793000]

console.log(timestampGroupToHumanReadable({ timestampGroup, lang: 'en' }))
