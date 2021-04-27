import { Sequelize, DataTypes } from 'sequelize'

export default function(sequelize: Sequelize) {
  sequelize.define('heroRace', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    heroId: DataTypes.INTEGER,
    raceId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}
