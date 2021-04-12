const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = async () => {
  if (process.env.NODE_ENV == 'test') {
    return low(new FileSync(process.env.DB_JSON))
  }

  return await low(new FileAsync(process.env.DB_JSON))
}
