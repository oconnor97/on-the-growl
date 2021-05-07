const router = require('express').Router();
const userRoutes = require('./user-routes');
const petRoutes = require('./pet-routes');
const petfinderRoutes = require('./petfinder-routes')

router.use('/users', userRoutes);
router.use('/petRoutes', petRoutes);
router.use('/pets', petfinderRoutes);

module.exports = router;