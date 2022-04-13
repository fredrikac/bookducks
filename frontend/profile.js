//PROFILE 
let profileDiv = document.querySelector('#myProfile');
let myBooks = document.querySelector('#myBooks');
let myAudiobooks = document.querySelector('#myAudio');

let currentUserID = sessionStorage.getItem('id');


// //Check if logged in - if not, hide profile side
let toggleMyprofile = ()=>{
  if(!sessionStorage.getItem('token')){
    console.log('you are not logged in')
    document.getElementById('profileContainer').classList.add('hidden');
  }else{
    let loggedIn = sessionStorage.getItem('id');
    console.log('Logged in as user id:', loggedIn);
    document.getElementById('profileContainer').classList.add('profileContainer');
  }
}
toggleMyprofile();


//Get userinfo 
let getUserInfo = async (id) => {
  let {data} = await axios.get(`http://localhost:1337/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  renderProfile(data);
}
getUserInfo(currentUserID);


//Render userinfo to the UI
let renderProfile = (userInfo) => {
  profileDiv.innerHTML = `
  <img src="./images/avatar.png" alt="duck" class="avatar">
  <ul>
  <li class="p">Username: ${userInfo.username}</li>
  <li class="p">Email: ${userInfo.email}</li>
  <li class="p">UserID: ${userInfo.id}</li>
  <li class="p">Member since ${userInfo.createdAt.slice(0, 10)}</li>
  </ul>`
}

//Get users books 
let getUserBooks = async (id) => {
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*");
  renderMyBooks(data);
}
getUserBooks(currentUserID);

//Get users audiobooks
let getUsersAudiobooks = async (id) => {
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
  renderMyAudiobooks(data);
}
getUsersAudiobooks(currentUserID);

//Render books
let renderMyBooks = (userBooks) => {
  userBooks.data.forEach(book => {

    let { title, author, pages, rating, user, genres, cover } = book.attributes;

    //det går ej att göra en hård jämförelse --- string & number?  
    let bookId = user.data.id;//den här behövs egentligen inte, men får vara där pga läsbarhet

    if(bookId == currentUserID){
      console.log('Same id: ', bookId, title, currentUserID)

      let div = document.createElement('div');

      genres.data.forEach(genre => {
        div.innerHTML += `<p class="genreP">| ${genre.attributes.genre} </p>`  
      });

      myBooks.innerHTML += `<div id="aBook" class="bookDiv"><img src="http://localhost:1337${cover.data.attributes.url}"> 
      ${div.innerHTML}
      <p>Title: ${title}</p>
      <p>Author: ${author}</p>
      <p>Rating: ${rating}</p>
      <p>Pages: ${pages}</p>  
      </div>`
    }
  })
}

//Render audiobooks
let renderMyAudiobooks = (userBooks) => {
  userBooks.data.forEach(book => {

    let { title, author, length, rating, user, genres, cover } = book.attributes;

    //det går ej att göra en hård jämförelse --- string & number?  
    let bookId = user.data.id;//den här behövs egentligen inte, men får vara där pga läsbarhet

    if(bookId == currentUserID){
      console.log('Same id: ', bookId, title, currentUserID)

      let div = document.createElement('div');

      genres.data.forEach(genre => {
        div.innerHTML += `<p class="genreP">| ${genre.attributes.genre} </p>`  
      });

      myAudiobooks.innerHTML += `<div id="aBook" class="bookDiv"><img src="http://localhost:1337${cover.data.attributes.url}"> 
      ${div.innerHTML}
      <p>Title: ${title}</p>
      <p>Author: ${author}</p>
      <p>Rating: ${rating}</p>
      <p>Length: ${length}</p>  
      </div>`
    }
  })
}


//UPLOAD NEW BOOKS - IN PROGRESS - GÖR KLART OM TID & ORK FINNS
//1.Börja med att få till alla inputfält 
//2.Överväg att dela upp den i två funktioner istället, en för books och en för audio

let addBook = async ()=> {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let rating = document.querySelector('#rating').value;
  let pages = document.querySelector('#pages').value;
  let length = document.querySelector('#length').value;
  let type;

  //kolla värdet från radio buttons 
  let radios = document.querySelectorAll('input[type=radio][name="typeOf"]');
  radios.forEach(radio => radio.addEventListener('change', () => {
    type = radio.value;
    return type;
  }));

  //Kolla vilka genres som är valda - byt till checkboxes? går det att välja flera alternativ ur dropdowns?


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
        //genres: [genres], // det måste vara en array med id:s på relationer
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




