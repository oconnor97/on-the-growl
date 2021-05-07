const router = require('express').Router();
const { User, Pet } = require('../models');
const withAuth = require('../utils/withAuth');
const fetch = require('node-fetch');
// const { in } = require('sequelize/types/lib/operators');
//generate API token

async function getToken() {
  try {
    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${process.env.API_KEY}&client_secret=${process.env.API_SECRET}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return response.json()
    
  } catch (err) {
    console.log(err)
  }
}

async function getUserData(userId) {
  try {
    const userData = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    })
    return userData.get({ plain: true });
  }
  catch (err) {
    console.log(err)
  }
}

function getRandom(obj) {
  return Math.floor(Math.random() * obj.length);
}

// router.get('/token', async (req, res) => {
//   try {
//     fetch('https://api.petfinder.com/v2/oauth2/token', {
//       method: 'POST',
//       body: `grant_type=client_credentials&client_id=${process.env.API_KEY}&client_secret=${process.env.API_SECRET}`,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//       .then(async (result) => {
//         const data = await result.json();
//         res.json(data)
//       })
//   }
//   catch (err) {
//     res.status(500).json(err.message);
//   }
// });
// deliver user data to the front end js
router.get('/userData', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    })
    res.json(userData);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/', withAuth, async (req, res) => {
  const token = await getToken()
  const userData = await getUserData(req.session.user_id);

  let options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token.token_type + ' ' + token.access_token,
    },
    mode: 'cors'
  }
  let apiUrl = 'https://api.petfinder.com/v2/animals?type=' + userData.species + '&location=' + userData.zip


  const { animals } = await fetch(apiUrl, options).then(pet => pet.json())

  const keys = Object.keys(animals);
  var randomIndex = Math.floor(Math.random() * keys.length);
  var randomPet = animals[keys[randomIndex]];
  console.log(randomPet)
  try {
    res.render('homepage', {
      randomPet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/pet/:id', async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
    });
    const individualPet = petData.get({ plain: true });
    res.render('individualPet', {
      ...individualPet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Pet }],
//     });
//     // const petData = await Pet.findAll({
//     // });
//     const user = userData.get({ plain: true });
//     // const individualPet = petData.get({ plain: true });
//     console.log(user, individualPet)
//     res.render('dashboard', {
//       ...user,
//       // individualPet,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});
module.exports = router;