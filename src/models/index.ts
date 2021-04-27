import { Sequelize } from 'sequelize'
import defineJob from './job.model'
import defineHero from './hero.model'
import defineRace from './race.model'
import defineHeroRace from './hero-race.model'
import { defineAssociation, seedData } from './extra-setup'

export default async function() {
  const sequelize = new Sequelize('sqlite::memory:', { logging: false })

  defineJob(sequelize)
  defineHero(sequelize)
  defineRace(sequelize)
  defineHeroRace(sequelize)

  defineAssociation(sequelize)

  await sequelize.sync({ force: true })
  await seedData(sequelize)

  return sequelize
}
