const router = require('express').Router();
const { User, Pet } = require('../../models');


router.post('/', async (req, res) => {
  try {
    await Pet.create(req.body)
    res.status(200).json();
  }
  catch (err) {
    res.json(err);
  }
})


router.get('/', async (req, res) => {
  try {
    const allPets = await Pet.findAll({
      include: [
        {
          model: User,
          attributes: ['id']
        }
      ]
    })
    res.status(200).json(allPets);
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
module.exports = router;

//