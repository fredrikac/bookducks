//LOGIN 
const loginBtn = document.querySelector('#loginBtn');
const createBtn = document.querySelector('#createBtn');

//queryparams för att hålla reda på vilken url man är på 

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
    location.href = 'start.html';
  
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
    let id = response.data.user.id;
    console.log(`User registration successful!`);
    sessionStorage.setItem('id', id);
    console.log(`Currently logged in as user id: ${id}. Got token: ${token}`);
    location.href = 'profile.html';
  })
  .catch(error => {
    console.log('Oh no! An error occurred:', error.response);
  });
}

createBtn.addEventListener('click', (e) => {
  e.preventDefault();
  register();
});

