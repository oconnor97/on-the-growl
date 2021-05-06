const findBtn = document.getElementById('findBtn');
const petContainer = document.getElementById('petContainer')

//call animals api using preferences from dashboard
let petArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

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


    petArray.forEach(function (i) {
      let newPet = data.animals[i].name;
      let p = document.createElement('p')
      p.innerHTML = newPet
      let myVariable = "title"
      let htmlSample = `
      <h1>${myVariable}</h1>
      <div>
      ${p}
      </div>
      `

      petContainer.append(htmlSample)
    })


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