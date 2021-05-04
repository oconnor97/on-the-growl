const router = require('express').Router();
// const { User, Shelter, Pet } = require('../models');
const withAuth = require('../utils/withAuth');

//generate API token
router.post('/', withAuth, async (req, res) => {
    try {
        console.log("Hello")
        
        fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: `grant_type=client_credentials&client_id=${process.env.API_KEY}&client_secret=${process.env.API_SECRET}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        
      })
      
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;