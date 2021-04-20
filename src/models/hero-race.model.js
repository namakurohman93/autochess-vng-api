module.exports = (sequelize, DataTypes) => {
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
