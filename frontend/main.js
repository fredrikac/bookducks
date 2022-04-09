//DOM-elements start page
const bookList = document.querySelector('#bookList');
const audioList = document.querySelector('#audioList');


//fetch all existing books 
//testar - dessa bör gå att lägga i en och samma funktion
let getBooks = async()=>{
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*");
  console.log(data);
  renderBookLists(data);
}
getBooks();

let getAudiobooks = async()=>{
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
}
//getAudiobooks();

let renderBookLists = async (books) => {
  books.data.forEach(book => {
    console.log(book)
    bookList.innerHTML += `Title: ${book.attributes.title} Author: ${book.attributes.author}`
  })
}