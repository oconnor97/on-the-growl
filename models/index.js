const Pet = require('./Pet');
const Shelter = require('./Shelter');
const User = require('./User');

User.hasMany(Pet, {
    foreignKey: 'pet_id'
});

Pet.belongsTo(Shelter, {
    foreignKey: 'shelter_id'
});

Shelter.hasMany(Pet, {
    foreignKey: 'pet_id'
});

module.exports = {Pet, Shelter, User};