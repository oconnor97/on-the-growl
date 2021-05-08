//get user input from form and implement to API call

const updateBtn = document.getElementById("update-settings")

const updatePrefrences = async (event) => {
    event.preventDefault();
    const species = document.getElementById('species').value;
    const zip = document.getElementById('zip').value

    console.log(species, zip)

    if (species && zip) {
        const response = await fetch('/dashboard', {
            method: 'PATCH',
            body: JSON.stringify({ species, zip }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            // document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

};




updateBtn.addEventListener('click', updatePrefrences)