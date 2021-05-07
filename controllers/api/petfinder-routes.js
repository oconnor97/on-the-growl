const router = require('express').Router();
const { User, Pet } = require('../../models');
// const withAuth = require('../../utils/withAuth');
const fetch = require('node-fetch');

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

function getRandom(obj) {
  return Math.floor(Math.random() * obj.length);
}

// router.get('/', async (req, res) => {
//   const token = await getToken()
//   const userData = await User.findByPk(req.session.user_id, {
//     attributes: { exclude: ['password'] },
//     include: [{ model: Pet }],
//   });

//   let options = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': token.token_type + ' ' + token.access_token,
//     },
//     mode: 'cors'
//   }

//   let apiUrl = 'https://api.petfinder.com/v2/animals?type=' + userData.species + '&location=' + userData.zip

//   const { animals } = await fetch(apiUrl, options).then(pet => pet.json())

//   const keys = Object.keys(animals);
//   const randomIndex = Math.floor(Math.random() * keys.length);
//   const randomPet = animals[keys[randomIndex]];
//   console.log(randomPet)
//   res.render('homepage')
// })


module.exports = router;