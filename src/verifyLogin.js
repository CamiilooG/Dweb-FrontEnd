const storedData = localStorage.getItem('data');
if (!storedData) {
    //redirecionar al index si el usuario no esta logueado (el user no esta en el local storage)
    location.href = '/'
}

