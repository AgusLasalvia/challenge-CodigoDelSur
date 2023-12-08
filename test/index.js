
localStorage.token = null

document.querySelector('#btnRegistration').addEventListener('click', () => {

    let email = document.querySelector('#txtRegistrationEmail').value;
    let password = document.querySelector('#txtRegistrationPassword').value;
    let firstName = document.querySelector('#txtRegistrationFirstName').value;
    let lastName = document.querySelector('#txtRegistrationLastName').value;

    fetch('http://localhost:3000/api/v1/registration', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa('registration:')
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.response == 'success') {
                document.querySelector('#pRegistration').innerHTML = `registration Successfully`
            }
            console.log(data);
        })
})


document.querySelector('#btnLogin').addEventListener('click', () => {
    let email = document.querySelector('#txtLoginEmail').value;
    let password = document.querySelector('#txtLoginPassword').value;
    fetch('http://localhost:3000/api/v1/auth/login', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa('login:')
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
        .then(response => response.json())
        .then((data) => {
            sessionStorage.setItem('token', data.token);
            console.log(data)
            if (data.token != undefined)
                document.querySelector('#pActualUser').innerHTML = `USUARIO: ${atob(data.token).split(':')[0]}`
        })
})





document.querySelector('#btnGetMovies').addEventListener('click', () => {
    let movieSelect = document.querySelector('#slcMovies')
    movieSelect.innerHTML = ""
    let keyword = document.querySelector('#txtKeyword').value
    let url = "http://localhost:3000/api/v1/movies"
    if (keyword != "") {
        url += `?keyword=${keyword}`
    }
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + sessionStorage.getItem('token')
        },
        method: 'GET'
    })
        .then(response => response.json())
        .then((data) => {
            data.forEach(element => {
                console.log(element)
                movieSelect.innerHTML += `<option value=${element.id}>${element.title}</option>`
            });
        })
});



document.querySelector('#btnAddFavorite').addEventListener('click', () => { 
    let movie = document.querySelector('#slcMovies').value
    fetch('http://localhost:3000/api/v1/movies/favorites', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + sessionStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify({"id":movie})
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        })
});