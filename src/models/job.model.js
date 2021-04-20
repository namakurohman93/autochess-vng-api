module.exports = (sequelize, DataTypes) => {
  sequelize.define('job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING(10),
    synergies: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue('synergies'))
      },
      set(value) {
        this.setDataValue('synergies', JSON.stringify(value))
      }
    },
    icon: DataTypes.STRING
  }, {
    timestamps: false
  })
}
