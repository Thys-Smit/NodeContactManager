
var dbConfig = {
  user: 'sa',
  password: 'ckmcpta7',
  server: 'localhost\\DEV',
  port: '1433',
  database: 'BritehouseContactList'
}

// closure perhaps needed to fix scope issue here
// var logConfig = {
//   filename: 'server.log',
//   folder: '\\logs\\',
//   logfile: () => {
//     return global.__basedir + '\\logs\\server.log'
//   },
//   logType: 'console'
// }

module.exports.dbConfig = dbConfig
// module.exports.logConfig = logConfig
