const unassignedTableBody = document.getElementById('table_body_package_unassigned')
fetchTable()
async function fetchTable() {
    const res = await fetch('http://localhost:3000/getallpackages',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const data = await res?.json()
    renderUnassignedTable(data)
}
function renderUnassignedTable(data) {
    data.forEach((packageElement) => {
        const { locationFrom, locationTo, state, idpackage, name } = packageElement
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

        const cellOptions = document.createElement('td')
        cellOptions.innerHTML = `
        <td class="centered">
            <button type="button" class="btn btn-danger">Cancel</button>
        </td>`
        row.append(cellOptions)

        const cellOptions2 = document.createElement('td')
        const deliveryFunction = () => {
            alert(`Entregado ${idpackage}`)
        }
        cellOptions2.innerHTML = `
        <td class="centered">
            <button type="button" class="btn btn-success" >Delivered</button>
        </td>`

        const button = cellOptions2.querySelector('button');
        button.onclick = deliveryFunction;
        row.append(cellOptions2)


        unassignedTableBody.append(row)
    })


}
