//DOM-elements start page
const bookList = document.querySelector('#bookList');
const audioList = document.querySelector('#audioList');

//Hämta alla användare & spara dem i en array?
//stäm av userId-propertyn med användarna

//GET books & audiobooks
let getBooks = async()=>{
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*");
  renderBooks(data);
}
//getBooks();

let getAudiobooks = async()=>{
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
  renderAudiobooks(data);
}
//getAudiobooks();

let renderBooks = async (books) => {
  books.data.forEach(book => {
    bookList.innerHTML += `<div class="bookDiv"><img src="http://localhost:1337${book.attributes.cover.data.attributes.url}"> <p>Title: ${book.attributes.title}</p>
    <p>Author: ${book.attributes.author} </p>
    <p>Rating: ${book.attributes.rating} </p>
    <p>Pages: ${book.attributes.pages}</p>
    <p>Submitted by: Username</p>
    <p>Email: useremail</p>
    </div>`
  })
}

let renderAudiobooks = async (audiobooks) => {
  audiobooks.data.forEach(audiobook => {
    audioList.innerHTML += `<div class="bookDiv"><img src="http://localhost:1337${audiobook.attributes.cover.data.attributes.url}"> <p>Title: ${audiobook.attributes.title}</p>
    <p>Author: ${audiobook.attributes.author} </p>
    <p>Rating: ${audiobook.attributes.rating} </p>
    <p>Length: ${audiobook.attributes.length}</p>
    <p>Submitted by: Username</p>
    <p>Email: useremail</p></div>`
  })
}






//PROFILE 

let profileDiv = document.querySelector('#myProfile');
let currentUserID = sessionStorage.getItem('id');

let getUserInfo = async (id) => {
  let {data} = await axios.get(`http://localhost:1337/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  renderProfile(data);
}
getUserInfo(currentUserID);


let getUserBooks = async (id)=> {
  //hämta alla böcker
  //Sortera ut alla vars userid matchar med id

}

let renderProfile = (userInfo) => {
  profileDiv.innerHTML = `
  <img src="./images/avatar.png" alt="duck" class="avatar">
  <ul>
   <li>Username: ${userInfo.username}</li>
  <li>Email: ${userInfo.email}</li>
  <li>UserID: ${userInfo.id}</li>
  <li>Member since ${userInfo.createdAt.slice(0, 10)}</li>
  </ul>`
}


//SIGN OUT 
document.querySelector('#signOutBtn').addEventListener('click', (e)=> {
  e.preventDefault();
  console.log('user clicks Sign out');
  sessionStorage.clear();
  location.reload();
})

//UPLOAD NEW BOOKS - detta borde funka, men det gör det inte. 403 Forbidden

let addBook = async ()=> {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let rating = document.querySelector('#rating').value;

  //kolla värdet från radio buttons 
  
 let radios = document.querySelectorAll('input[type=radio][name="typeOf"]');
   radios.forEach(radio => radio.addEventListener('change', () => {
   let type = radio.value;
   return type;
 }));

  //hämta image från filuppladdning
  let cover = document.querySelector('#upload').files;

  //vi måste skapa formdata för att det ska funka
  let imgData = new FormData();
  
  //appenda själva bilden till formdataobjektet. key+value
  imgData.append('files', cover[0]);

  //ladda upp bilden
  await axios.post('http://localhost:1337/api/upload/', imgData).then(response => {

    axios.post(`http://localhost:1337/api/${type}`, {
      data: {
        title, 
        author, 
        rating, 
        //favorite_candies: [favorite_candies], // det måste vara en array med id:s på relationer
        cover: response.data[0].id
      }
    },{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
  })
  }).catch(error => {
    console.log('Oh no! An error occurred:', error.response);
  })
}

document.querySelector('#addBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  addBook();
})



  
