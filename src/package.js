const dataUser = JSON.parse(localStorage.getItem('data'))
const formEnvioUser = document.getElementById('envio_package')
const iduser = dataUser.iduser
formEnvioUser.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const typeOfPackage = formEnvioUser.elements['package_type'].value
    const locationFrom = formEnvioUser.elements['locationFrom'].value
    const locationTo = formEnvioUser.elements['destination'].value
    const size = formEnvioUser.elements['size'].value
    const weight = formEnvioUser.elements['weight'].value

    const payload = {
       locationFrom,
       locationTo,
       typeOfPackage,
       size,
       weight
    }
    
    const res = await fetch('http://127.0.0.1:3000/registerpackage', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (!(typeOfPackage && size && weight && locationTo && locationFrom)) return alert('Campos incompletos')
    const data = await res.json()
    if (data?.message) return alert(data.message)
    localStorage.setItem('data', JSON.stringify(data));
    //location.href = '/index.html' 
})