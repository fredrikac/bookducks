//SIGN OUT 
document.querySelector('#signOutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('user clicks Sign out');
  sessionStorage.clear();
  location.reload();
  location.href = 'start.html';
});

//Change visibility on nav-links if user is or is not logged in
let toggleSignIn = () => {
  if(sessionStorage.getItem('token')){
  document.getElementById('loginLink').classList.add('hidden');
  }else{
    document.getElementById('profileLink').classList.add('hidden');
    document.getElementById('signOutBtn').classList.add('hidden');
  }
}
toggleSignIn();