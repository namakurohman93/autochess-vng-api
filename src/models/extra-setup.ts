import fs from 'fs'
import { Sequelize } from 'sequelize'

export function defineAssociation(sequelize: Sequelize) {
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

export async function seedData(sequelize: Sequelize) {
  const { heroes, classes, races, heroRaces } = JSON.parse(fs.readFileSync(
    process.env.DB_JSON as string,
    'utf8'
  ))
  const { job, hero, race, heroRace } = sequelize.models

  await job.bulkCreate(classes)
  await hero.bulkCreate(heroes)
  await race.bulkCreate(races)
  await heroRace.bulkCreate(heroRaces)
}
