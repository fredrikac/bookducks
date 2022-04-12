//LOGIN 
const loginBtn = document.querySelector('#loginBtn');
const createBtn = document.querySelector('#createBtn');

//Pusha in users id i sessionstorage tillsammans med token?!!!!! IDE
//När användaren loggat in vill jag att den ska dirigeras till startsidan
//Sign in ska ändras till sign out?
let login = async () => {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  
  let response = await axios.post("http://localhost:1337/api/auth/local", {
    identifier: username,
    password
  })
  .then(response => {
    let token = response.data.jwt;
    let id = response.data.user.id;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem('id', id)
    console.log(`Currently logged in as user id: ${id}. Got token: ${token}`);

    renderLoggedIn();
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
}

loginBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  login();
  console.log(loggedInAs)
});

//When user is logged in, redirect to start page
//Show My Profile
let renderLoggedIn = () => {
  console.log('function renderloggedin runs')
  //Redirect to Start page
  //location.href = 'start.html';//funkar
  
  // //Also, change Sign in to Sign out 
  // document.getElementById('loginLink').innerText = 'Sign out';

}

//REGISTER NEW USER

//När ny user är skapad, så vill jag att den ska vara inloggad
let register = async ()=>{
  let newUser = document.querySelector("#newUser").value;
  let newPassword = document.querySelector("#userPass").value;
  let userEmail = document.querySelector('#userEmail').value;

  let response = await axios.post("http://localhost:1337/api/auth/local/register", {
      username: newUser,
      password : newPassword,
      email : userEmail
  })
  .then(response =>{
    let token = response.data.jwt;
    sessionStorage.setItem("token", token);
  
    console.log(`User registration successful!`)

  })
  .catch(error => {
    console.log('Oh no! An error occurred:', error.response);
  });
}

createBtn.addEventListener('click', (e) => {
  e.preventDefault();
  register();
});

