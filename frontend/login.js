//LOGIN 
const loginBtn = document.querySelector('#loginBtn');
const createBtn = document.querySelector('#createBtn');

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
    sessionStorage.setItem('id', id);
    location.href = 'start.html';
  })
  .catch(error => {
    if(error.response.status === 400){
      alert(`Oops, that didn't work! Did you spell everything correctly?`)
    }else{
      alert('Something went wrong :(')
      console.log('An error occurred:', error.response);
    }
  });
}


//REGISTER NEW USER
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
      location.href = 'start.html';
  })
  .catch(error => {
    if(error.response.status === 400){
      alert('This username is already taken. Try another one!')
    }else{
      alert('Something went wrong :(')
      console.log('An error occurred:', error.response);
    }
  });
}


//BUTTONS
loginBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  login();
});

createBtn.addEventListener('click', (e) => {
  e.preventDefault();
  register();
});

