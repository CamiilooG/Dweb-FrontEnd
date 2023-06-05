const formEnvioUser = document.getElementById('envio_package')
const tableBodyPackageUser = document.getElementById('table_body_package_user')
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
       weight, 
       iduser: userInfo.iduser
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
getPackage(tableBodyPackageUser)
async function getPackage(table){
    const res = await fetch(`http://localhost:3000/getpackagebyid?iduser=${userInfo.iduser}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
        
    })
    console.log(res)
    const data = await res?.json()
    renderEmptyTable(data, table)
}
async function renderEmptyTable(data, table){
    data.forEach((packageElement) => {
        const {locationFrom, locationTo, state, idpackage, name} = packageElement
        console.log(packageElement)

        const row = document.createElement('tr')
        const cellPackageId = document.createElement('td')
        cellPackageId.innerText = idpackage
        row.append(cellPackageId)

        const cellNameUser = document.createElement('td')
        cellNameUser.innerText = name
        row.append(cellNameUser)

        const cellAddress = document.createElement('td')
        cellAddress.innerText = locationFrom
        row.append(cellAddress)

        const cellLocation = document.createElement('td')
        cellLocation.innerText = locationTo
        row.append(cellLocation)

        const cellState = document.createElement('td')
        cellState.innerText = state
        row.append(cellState)
        
        table.append(row)
   
    })
}
function cleanTable(table) {
    table.innerHTML = ''
}