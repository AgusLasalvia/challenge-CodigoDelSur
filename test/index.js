


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
            localStorage.setItem('token', data.token);
            console.log(data)
            // document.querySelector('#pActualUser').innerHTML = `USUARIO: ${atob(data.token).split(':')[0]}`
        })
})




document.querySelector('#btn').addEventListener('click', () => {
    fetch('http://localhost:3000/api/v1/movies', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa('admin:admin')
        },
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
})