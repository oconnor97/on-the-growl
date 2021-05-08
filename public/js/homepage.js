
const likeBtn = document.getElementById('like')




//call animals api using preferences from dashboard

const likeBtnFunc = async (req, res) => {
  const user_id = document.getElementById('user-id').value;
  const image = document.getElementById('image').src
  const pet_name = document.getElementById('pet_name').innerHTML
  const status = document.getElementById('pet_status').innerHTML
  const email = document.getElementById('pet_email').innerHTML
  const phone = document.getElementById('pet_phone').innerHTML
  const breed = document.getElementById('pet_breed').innerHTML
  const age = document.getElementById('pet_age').innerHTML
  const gender = document.getElementById('pet_gender').innerHTML
  const description = document.getElementById('pet_description').innerHTML


  console.log(user_id)
  console.log(image)
  console.log(pet_name)
  console.log(status)
  console.log(email)
  console.log(phone)
  console.log(breed)
  console.log(age)
  console.log(gender)
  console.log(description)


  if (user_id, image, pet_name, status, email, phone, breed, age, gender, description) {
    const response = await fetch('/api/petRoutes', {
      method: 'POST',
      body: JSON.stringify({ user_id, image, pet_name, status, email: email, phone, breed, age, gender, description }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

likeBtn.addEventListener('click', likeBtnFunc)




