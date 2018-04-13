/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hupai', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    month: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    warningPrice: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    averagePrice: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    numberOfHupai: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    numberOfPeople: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rateOfBid: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    isValid: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    lastPriceArray: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    tableName: 'hupai'
  });
};
