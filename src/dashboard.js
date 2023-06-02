const dataUser = JSON.parse(localStorage.getItem('data'))
const nombreDeUsuario = document.getElementById('nameUser')
const locacionDeUsuario = document.getElementById('locationUser')
console.log(dataUser)
nombreDeUsuario.innerText = dataUser.name
locacionDeUsuario.innerText = dataUser.name