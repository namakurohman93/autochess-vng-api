const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

module.exports = dbPath => low(new FileAsync(dbPath))
