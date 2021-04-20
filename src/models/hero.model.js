module.exports = (sequelize, DataTypes) => {
  sequelize.define('hero', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING(25),
    name: DataTypes.STRING(25),
    quality: {
      type: DataTypes.STRING(10),
      validate: {
        isIn: {
          args: [['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']],
          msg: "only receive 'Common', 'Uncommon', 'Rare', 'Epic', or 'Legendary'"
        }
      }
    },
    cost: DataTypes.INTEGER,
    stats: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue('stats'))
      },
      set(value) {
        this.setDataValue('stats', JSON.stringify(value))
      }
    },
    ability: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue('ability'))
      },
      set(value) {
        this.setDataValue('ability', JSON.stringify(value))
      }
    },
    pictures: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue('pictures'))
      },
      set(value) {
        this.setDataValue('pictures', JSON.stringify(value))
      }
    },
    icon: DataTypes.STRING,
    classId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}
