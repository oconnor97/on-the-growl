const Pet = require('./Pet');
const User = require('./User');

User.hasMany(Pet, {
    foreignKey: 'user_id',
    constraints: false
});

Pet.belongsTo(User, {
    constraints: false,
    foreignKey: 'user_id'
});

module.exports = {Pet, User};
