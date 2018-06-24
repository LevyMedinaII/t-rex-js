module.exports = (IO) => {
  return [
    { location: require('./sample-resource/sample-resource')(IO), path: '/sample'},
  ]
}