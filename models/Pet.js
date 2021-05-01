const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        pet_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shelter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'shelter',
                key: 'id'
            }
        },
    },
    {

    
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'pet'
    }
    
);

module.exports = Pet;