const form_login = document.getElementById('formLogin')
form_login.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = form_login.elements['email'].value
    const password = form_login.elements['password'].value
    const typeOfUser = form_login.elements['list_type_of_user_login'].value
    if (typeOfUser == 'user') {
        const payload = {
            username,
            password
        }
        const res = await fetch('http://4.246.177.149:3001/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (data?.message) return alert(data.message)
        localStorage.setItem('data', JSON.stringify(data));
        location.href = '/envios.html'
    } else if(typeOfUser =='delivery') {
        const payload = {
            username,
            password
        }
        const res = await fetch('http://4.246.177.149:3001/api/logindelivery', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (data?.message) return alert(data.message)
        localStorage.setItem('data', JSON.stringify(data));
        location.href = '/envios-domiciliario.html'
    } else {
        const payload = {
            username,
            password
        }
        const res = await fetch('http://4.246.177.149:3001/api/loginadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (data?.message) return alert(data.message)
        localStorage.setItem('data', JSON.stringify(data));
        location.href = '/admin.html'
    }
}
)