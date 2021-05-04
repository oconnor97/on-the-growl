const findBtn = document.getElementById('findBtn');

findBtn.addEventListener('click', async () => {
    let data = await getToken();
    console.log(data.token_type, data.access_token)
    fetch('https://api.petfinder.com/v2/animals', {
      'mode': 'no-cors'
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': data.token_type + ' ' + data.access_token,
      }
    }).then(function (resp) {
  
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
       fetch('/token').then( (result) => resolve(result) );
    });
 }