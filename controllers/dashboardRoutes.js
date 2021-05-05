const router = require('express').Router();
const { User, Pet } = require('../models');
const withAuth = require('../utils/withAuth');
const fetch = require('node-fetch');

//all saved pets
router.get('/dashboard', async (req, res) => {
    try {
      const allPets = await Pet.findAll()
      res.status(200).json(allPets);
    }
    catch (err) {
      res.json(err);
    }
  })
//saved pet by id
router.get('/:id', async (req, res) => {
    try {
      const individualUser = await User.findByPk(req.params.id, {
        include: [
          {
            model: Pet,
            attributes: ['pet_name']
          }
        ]
      })
      res.status(200).json(individualUser);
    }
    catch (err) {
      res.json(err);
    }
  })