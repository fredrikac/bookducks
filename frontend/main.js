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





//PROFILE 
//När user är inloggad: 
//1. hämta info 
//2. rendera ut på profil-sidan

let profileDiv = document.querySelector('#myProfile');

let getUserInfo = async (id) => {
  let {data} = await axios.get(`http://localhost:1337/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });

  console.log(data)
  renderProfile(data);
}
getUserInfo(2);


let getUserBooks = async (id)=> {
  //hämta alla böcker
  //Sortera ut alla vars userid matchar med id

}

let renderProfile = (userInfo) => {
  console.log(userInfo)
  profileDiv.innerHTML = `
  <img src="./images/avatar.png" alt="duck" class="avatar">
  <ul>
   <li>Username: ${userInfo.username}</li>
  <li>Email: ${userInfo.email}</li>
  <li>UserID: ${userInfo.id}</li>
  <li>Member since ${userInfo.createdAt.slice(0, 10)}</li>
  </ul>`
}
