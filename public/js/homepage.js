const findBtn = document.getElementById('findBtn');
// const fetch = require('node-fetch');

findBtn.addEventListener('click', async () => {
    let data = await getToken();
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': data.token_type + ' ' + data.access_token,
      },
      mode: 'cors'
    }
    console.log(options)
    fetch('https://api.petfinder.com/v2/animals', options).then(function (resp) {
  
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
       fetch('/token').then( (result) => resolve(result.json()) );
    });
 }