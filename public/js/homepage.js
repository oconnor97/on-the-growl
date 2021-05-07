

const petContainer = document.getElementById('petContainer');
const likeBtn = document.getElementById('next')

// const slideshow = document.querySelector('.slideshow-container')

const petCard = document.getElementById('petCard')

//call animals api using preferences from dashboard
likeBtn.addEventListener('click', fetchImg )

function likeBtnFunc() {
    slideshow.innerHTML = `<img src= {{primary_photo_cropped.small}}>`
}


//lazy load pet data to homepage
const placeholder = `<img src='../assets/images/placeholder.png'`;

async function fetchImg() {
    try{
      const response = await fetch('/', {
        method: 'GET'
      });
      response.json
    } catch {console.log('nope')}
}

