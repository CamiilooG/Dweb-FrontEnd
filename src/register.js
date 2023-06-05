const form_register = document.getElementById('formRegister')
form_register.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = form_register.elements['name'].value
    const email = form_register.elements['email'].value
    const password = form_register.elements['password'].value
    const confirm_password = form_register.elements['confirm_password'].value
    const location = form_register.elements['location'].value
    const typeOfUser = form_register.elements['list_type_of_user'].value
    const locationInput = document.getElementById('location').value
    if (typeOfUser == 'user') {
        const payload = {
            name,
            email,
            password,
            location
        }

        if (!(name && email && password && confirm_password && location)) return alert('Campos incompletos')
        if (password != confirm_password) return alert('las contraseñas deben ser iguales')
        const res = await fetch('http://127.0.0.1:3000/registeruser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        alert(data?.message)
        window.location.href = '/index.html'
    } else {
        const payload = {
            name,
            email,
            password
        }
        if (!(name && email && password && confirm_password && location)) return alert('Campos incompletos')
        if (password != confirm_password) return alert('las contraseñas deben ser iguales')
        const res = await fetch('http://127.0.0.1:3000/registerdelivery', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        alert(data?.message)
        window.location.href = '/index.html'
    }
})