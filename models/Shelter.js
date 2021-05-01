const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shelter extends Model {}

Shelter.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        shelter_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shelter_location: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        shelter_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        sequelize,
        freeTableName: true,
        underscored: true,
        modelName: 'comment'
    },

);

module.exports = Shelter;