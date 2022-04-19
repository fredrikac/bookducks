//DOM-elements start page
const bookList = document.querySelector('#bookList');
const audioList = document.querySelector('#audioList');

//GET books & audiobooks
let getBooks = async () => {
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*");
  renderBooks(data);
}
getBooks();

let getAudiobooks = async() => {
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
  renderAudiobooks(data);
}
getAudiobooks();


//Render to the UI
//BOOKS
let renderBooks = async (books) => {
  books.data.forEach(book => {

    let { title, author, pages, rating, user, genres, cover } = book.attributes;
    let { username, email } = user.data.attributes;

    let div = document.createElement('div');

    genres.data.forEach(genre => {
      div.innerHTML += `<p class="genreP"> ${genre.attributes.genre} </p>`  
    });

    bookList.innerHTML += `<div class="bookDiv book">
    <img src="http://localhost:1337${cover.data.attributes.url}"> 
      ${div.innerHTML}<br>
    <p class="p">Title: ${title}</p>
    <p class="p">Author: ${author}</p>
    <p class="p">Rating: ${rating}</p>
    <p class="p">Pages: ${pages}</p>
    <p class="p">Submitted by: ${username}</p>
    <p class="p">Email: ${email}</p>
    </div>`
  })
}

//AUDIOBOOKS
let renderAudiobooks = async (audiobooks) => {
  audiobooks.data.forEach(audiobook => {

    let { title, author, length, rating, user, genres, cover } = audiobook.attributes;
    let { username, email } = user.data.attributes;

    let div = document.createElement('div');

    genres.data.forEach(genre => { 
      div.classList.add('genreDiv');
      div.innerHTML += `<p class="genreP"> ${genre.attributes.genre} </p>`  
    })

    audioList.innerHTML += `<div class="bookDiv audio">
    <span class="genreLabel">audio</span>
    <img src="http://localhost:1337${cover.data.attributes.url}"> 
    ${div.innerHTML}<br>
    <p class="p">Title: ${title}</p>
    <p class="p">Author: ${author}</p>
    <p class="p">Rating: ${rating}</p>
    <p class="p">Length: ${length}</p>
    <p class="p">Submitted by: ${username}</p>
    <p class="p">Email: ${email}</p></div>`
  })
}