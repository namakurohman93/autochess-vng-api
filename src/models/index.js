const { Sequelize, DataTypes } = require('sequelize')
const defineJob = require('./job.model')
const defineHero = require('./hero.model')
const defineRace = require('./race.model')
const defineHeroRace = require('./hero-race.model')
const { defineAssociation, seedData } = require('./extra-setup')

async function init() {
  const sequelize = new Sequelize('sqlite::memory:', { logging: false })

  defineJob(sequelize, DataTypes)
  defineHero(sequelize, DataTypes)
  defineRace(sequelize, DataTypes)
  defineHeroRace(sequelize, DataTypes)

  defineAssociation(sequelize)

  await sequelize.sync({ force: true })
  await seedData(sequelize)

  return sequelize
}

module.exports = init
