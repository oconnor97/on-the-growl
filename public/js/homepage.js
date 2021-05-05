const findBtn = document.getElementById('findBtn');

//call animals api using preferences from dashboard


findBtn.addEventListener('click', async () => {
  let data = await getToken();
  let userData = await getUserData();
  let options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': data.token_type + ' ' + data.access_token,
    },
    mode: 'cors'
  }
  let apiUrl = 'https://api.petfinder.com/v2/animals?type=' + userData.species + '&location=' + userData.zip

  console.log(userData)
  fetch(apiUrl, options).then(function (resp) {

    // Return the response as JSON
    return resp.json();

  }).then(function (data) {

    // Log the API data
    console.log('token', data);

  }).catch(function (err) {

    // Log any errors
    console.log('something went wrong', err);

  });
});

async function getToken() {
  return new Promise((resolve, reject) => {
    fetch('/token').then((result) => resolve(result.json()));
  });
}

async function getUserData() {
  return new Promise((resolve, reject) => {
    fetch('/userData').then((result) => resolve(result.json()));
  });
}