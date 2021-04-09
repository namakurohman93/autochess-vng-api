const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

module.exports = () => low(new FileAsync(process.env.DB_JSON))
