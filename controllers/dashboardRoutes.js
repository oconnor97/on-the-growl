const router = require('express').Router();
const { User, Pet } = require('../models');
const withAuth = require('../utils/withAuth');


// //all saved pets
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    })

    const user = userData.get({ plain: true });
    res.render('dashboard', {
      // allPets,
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});
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


router.patch('/', async (req, res) => {
  console.log(req.body)
  console.log(req.body.species)
  console.log(req.body.zip)
  console.log(req.session.user_id)
  // update a user by its `id` value
  try {
    const userData = await User.update(
      {
        species: req.body.species,
        zip: req.body.zip
      },
      {
        where: {
          id: req.session.user_id
        }
      })

    if (!userData) {
      res.status(404).json({ message: 'No user with this id found!' })
    }

    res.status(200).json(userData);
  } catch ({ message }) {
    console.log(message)
    res.status(500).json({ message })

  }
});


module.exports = router;