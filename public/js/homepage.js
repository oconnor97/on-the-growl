const findBtn = document.getElementById('findBtn');

findBtn.addEventListener('click', async () => {
    let data = await getToken();
    fetch('https://api.petfinder.com/v2/animals', {
      // method: 'POST',
      // body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`,
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

  // function getToken() {
  //   const tokenFetch = new Promise((resolve, reject) => {
  //     resolve("OK");
  //     reject("error");
  //   })
  //   tokenFetch.then(function(data) {
  //     console.log(data)
  //     return data.json();
  //   },

  //   function(error) {
  //     console.log(error.json(error.message))
  //   }
  //   )

  // }

      // fetch('/token').then(async function (data) {
    //     // console.log(data.json());
    //     return await data.json();
    // })