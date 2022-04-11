//DOM-elements start page
const bookList = document.querySelector('#bookList');
const audioList = document.querySelector('#audioList');


//fetch all existing books 
//testar - dessa bör gå att lägga i en och samma funktion
// let getBooks = async()=>{
//   let {data} = await axios.get("http://localhost:1337/api/books?populate=*");
//   console.log(data);
//   renderBookLists(data);
// }
// getBooks();

// let getAudiobooks = async()=>{
//   let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
// }
// //getAudiobooks();

// let renderBookLists = async (books) => {
//   books.data.forEach(book => {
//     console.log(book)
//     bookList.innerHTML += `Title: ${book.attributes.title} Author: ${book.attributes.author}`
//   })
// }



//LOGIN 
const loginBtn = document.querySelector('#loginBtn');
const createBtn = document.querySelector('#createBtn');

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
    sessionStorage.setItem("token", token);
    console.log('User logged in! got token: ', token)
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
}

loginBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  login();
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


//PROFILE 
//hämta info från inloggad user 
//rendera ut på profil-sidan