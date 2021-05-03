const router = require('express').Router();
const { User, Pet } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allPets = await Pet.findAll({
      include: [
        {
          model: Pet,
          attributes: ['pet_name']
        }
      ]
    })
    res.status(200).json(allUsers);
  }
  catch (err) {
    res.json(err);
  }
})

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