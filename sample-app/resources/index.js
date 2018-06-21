module.exports = (IO) => {
  return [
    { location: require('./sample/sample')(IO), path: '/sample'},
  ]
}