//PROFILE 
let profileDiv = document.querySelector('#myProfile');
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
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*");

  data.data.forEach(obj => {
    //console.log(obj.attributes.userId)//bokens userID
    //om bokens userId matchar id (som är currentUserID)... 

    if(obj.attributes.userId === id){
      console.log('match')
    }
  })

  console.log('userBooks: ', data.data)
}
getUserBooks(currentUserID);

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




//UPLOAD NEW BOOKS - detta borde funka, men det gör det inte. 403 Forbidden. Fel på datan som skickas probably
//Dela upp detta i flera funktioner för att få till length och pages?

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




