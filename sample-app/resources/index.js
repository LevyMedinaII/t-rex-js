/*
 * NOTE: T-Rex uses the insertion comment to automatically incorporate
 *  newly generated resources using the <add> command
 */
module.exports = (IO) => {
  return [
    { location: require('./sample-resource/sample-resource')(IO), path: '/sample'},
    { location: require('./test/test')(IO), path: '/test'}
		//INSERTION
  ]
}