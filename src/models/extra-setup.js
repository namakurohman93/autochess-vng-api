const fs = require('fs')

function defineAssociation(sequelize) {
  const { hero, job, race, heroRace } = sequelize.models

  job.hasMany(hero, { foreignKey: 'classId' })
  hero.belongsTo(job, { as: 'class', foreignKey: 'classId' })

  hero.belongsToMany(race, {
    through: heroRace,
    foreignKey: 'heroId'
  })
  race.belongsToMany(hero, {
    through: heroRace,
    foreignKey: 'raceId'
  })
}

async function seedData(sequelize) {
  const { heroes, classes, races, heroRaces } = JSON.parse(fs.readFileSync(
    process.env.DB_JSON,
    'utf8'
  ))
  const { job, hero, race, heroRace } = sequelize.models

  await job.bulkCreate(classes)
  await hero.bulkCreate(heroes)
  await race.bulkCreate(races)
  await heroRace.bulkCreate(heroRaces)
}

module.exports = { defineAssociation, seedData }
