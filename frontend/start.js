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
getBooks();

let getAudiobooks = async()=>{
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
  renderAudiobooks(data);
}
getAudiobooks();

let renderBooks = async (books) => {
  books.data.forEach(book => {
    console.log(book)

    let { genres } = book.attributes;

    genres.data.forEach(genre => {
      console.log(genre.attributes.genre)//det här når genres. Men det kanske är bättre att destructurera objektet på annat sätt för att undvika två foreach
    })

    bookList.innerHTML += `<div class="bookDiv"><img src="http://localhost:1337${book.attributes.cover.data.attributes.url}"> <p>Title: ${book.attributes.title}</p>
    <p>Author: ${book.attributes.author}</p>
    <p>Rating: ${book.attributes.rating}</p>
    <p>Pages: ${book.attributes.pages}</p>
    <p>Submitted by: Username</p>
    <p>Email: useremail</p>
    </div>`
  })
}

let renderAudiobooks = async (audiobooks) => {
  audiobooks.data.forEach(audiobook => {
    audioList.innerHTML += `<div class="bookDiv"><img src="http://localhost:1337${audiobook.attributes.cover.data.attributes.url}"> <p>Title: ${audiobook.attributes.title}</p>
    <p>Author: ${audiobook.attributes.author}</p>
    <p>Rating: ${audiobook.attributes.rating}</p>
    <p>Length: ${audiobook.attributes.length}</p>
    <p>Submitted by: Username</p>
    <p>Email: useremail</p></div>`
  })
}