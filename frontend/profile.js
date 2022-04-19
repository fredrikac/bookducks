//PROFILE 
let profileDiv = document.querySelector('#myProfile');
let myBooks = document.querySelector('#myBooks');
let myAudiobooks = document.querySelector('#myAudio');

let currentUserID = sessionStorage.getItem('id');

//Behövs ens denna????? gör samma sak som funktionen i main.js
//Check if logged in - if not, hide profile side
let toggleMyprofile = () => {
  if(!sessionStorage.getItem('token')){
    console.log('you are not logged in')
    document.getElementById('profileContainer').classList.add('hidden');
  }else{
    let loggedIn = sessionStorage.getItem('id');
    console.log('Logged in as user id:', loggedIn);
    document.getElementById('profileContainer').classList.add('profileInfo');
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
  <img src="./images/lunar12.png" alt="lunarstorm avatar" class="avatar">
  <ul>
  <li class="p">Username: ${userInfo.username}</li>
  <li class="p">Email: ${userInfo.email}</li>
  <li class="p">UserID: ${userInfo.id}</li>
  <li class="p">Member since ${userInfo.createdAt.slice(0, 10)}</li>
  </ul>`
}


//Get users books 
let getUserBooks = async (id) => {
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*", {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  renderMyBooks(data);
}
getUserBooks(currentUserID);


//Get users audiobooks
let getUsersAudiobooks = async (id) => {
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*", {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  renderMyAudiobooks(data);
}
getUsersAudiobooks(currentUserID);


//Render books
let renderMyBooks = (userBooks) => {
  userBooks.data.forEach(book => {

    let { title, author, pages, rating, user, genres, cover } = book.attributes;

    let bookId = user.data.id;

    if(bookId == currentUserID){
      let div = document.createElement('div');

      genres.data.forEach(genre => {
        div.innerHTML += `<p class="genreP"> ${genre.attributes.genre} </p>`  
      });

      myBooks.innerHTML += `<div id="aBook" class="bookDiv book">
      <img src="http://localhost:1337${cover.data.attributes.url}"> 
      ${div.innerHTML}
      <p class="p">Title: ${title}</p>
      <p class="p">Author: ${author}</p>
      <p class="p">Rating: ${rating}</p>
      <p class="p">Pages: ${pages}</p>  
      </div>`
    }
  })
}


//Render audiobooks
let renderMyAudiobooks = (userBooks) => {
  userBooks.data.forEach(book => {

    let { title, author, length, rating, user, genres, cover } = book.attributes;

    let bookId = user.data.id;

    if(bookId == currentUserID){
      let div = document.createElement('div');

      genres.data.forEach(genre => {
        div.innerHTML += `<p class="genreP"> ${genre.attributes.genre} </p>`  
      });

      myAudiobooks.innerHTML += `<div id="aBook" class="bookDiv audio">
      <span class="genreLabel">audio</span>
      <img src="http://localhost:1337${cover.data.attributes.url}"> 
      ${div.innerHTML}
      <p class="p">Title: ${title}</p>
      <p class="p">Author: ${author}</p>
      <p class="p">Rating: ${rating}</p>
      <p class="p">Length: ${length}</p>  
      </div>`
    }
  })
}


//UPLOAD NEW BOOKS
//Upload BOOK
let addBook = async () => {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let rating = document.querySelector('#rating').value;
  let pages = document.querySelector('#pages').value;
  let genres = [];
  for (let option of document.getElementById('selectGenre').options)
  {
      if (option.selected) {
          genres.push(option.value);
      }
  }

  let cover = document.querySelector('#upload').files;
  let imgData = new FormData();
  imgData.append('files', cover[0]);

  await axios.post('http://localhost:1337/api/upload/', imgData, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  }).then(response => {

    axios.post(`http://localhost:1337/api/books`, {
      data: {
        title,
        author,
        rating,
        pages,
        genres, 
        user: [currentUserID],
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


//Upload AUDIO
let addAudiobook = async () => {
  let audioTitle = document.querySelector('#audioTitle').value;
  let audioAuthor = document.querySelector('#audioAuthor').value;
  let audioRating = document.querySelector('#audioRating').value;
  let length = document.querySelector('#length').value;
  let audioGenres = [];
  for (let option of document.getElementById('selectAudioGenre').options)
  {
      if (option.selected) {
          audioGenres.push(option.value);
      }
  }

  let audioCover = document.querySelector('#audioUpload').files;

  let imgData = new FormData();
  
  imgData.append('files', audioCover[0]);

  await axios.post('http://localhost:1337/api/upload/', imgData, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  }).then(response => {

    axios.post(`http://localhost:1337/api/audiobooks`, {
      data: {
        title : audioTitle,
        author : audioAuthor,
        rating : audioRating,
        length,
        genres: audioGenres, 
        user: [currentUserID],
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


document.querySelector('#addBookBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  addBook();
})

document.querySelector('#addAudioBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  addAudiobook();
})



