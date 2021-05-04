const findBtn = document.getElementById('findBtn');

findBtn.addEventListener('click', () => {
    console.log("hello")
    let data = getToken();
    console.log(data)
    fetch('https://api.petfinder.com/v2/oauth2/token', {
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

  function getToken() {
      //might need to await
    fetch('/token').then(async function (data) {
        // console.log(data.json());
        return await data.json();
    })
  }