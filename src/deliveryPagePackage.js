const unassignedTableBody = document.getElementById('table_body_package_unassigned')
const assignedTableBody = document.getElementById('table_body_package_assigned')
const deliveredTableBody = document.getElementById('tableBody_package_delivery')
fetchTable('getallpackages', unassignedTableBody, 1)
fetchTable(`getassignedpackages?iddelivery=${userInfo.iddelivery}`, assignedTableBody, 2)

async function fetchTable(endpoint, table, buttonSet) {
    const res = await fetch(`http://localhost:3000/${endpoint}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const data = await res?.json()
    renderTables(data, table, buttonSet)
}
function renderTables(data, table, buttonSet) {
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

        buttons(buttonSet, row, idpackage)
        table.append(row)
    })
}

function cleanTable(table) {
    table.innerHTML = ''
}
function buttons(buttonSet, row, idpackage) {
    switch (buttonSet) {
        case 1:
            const cellOptions2 = document.createElement('td')
            const takeFunction = async () => {
                const payload = {
                    iddelivery: userInfo.iddelivery,
                    idpackage: idpackage
                }
                const res = await fetch('http://4.246.177.149/api/takepackage', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                const data = await res.json()
                alert(data?.message)
                cleanTable(unassignedTableBody)
                fetchTable('getallpackages', unassignedTableBody, 1)
                cleanTable(assignedTableBody)
                fetchTable(`getassignedpackages?iddelivery=${userInfo.iddelivery}`, assignedTableBody, 2)
            }
            cellOptions2.innerHTML = `
         <td class="centered">
             <button type="button" class="btn btn-success">take</button>
         </td> 
         `

            const button = cellOptions2.querySelector('button');
            button.onclick = takeFunction;
            row.append(cellOptions2)
            break;
        case 2:
            const cellOptions = document.createElement('td')
            cellOptions.innerHTML = `
            <td class="centered">
                <button type="button" class="btn btn-danger">reject</button>
            </td>
            `
            row.append(cellOptions)

            const cellOptionButtonDelivery = document.createElement('td')
            const deliveryFunction = async () => {
                const payload = {
                    iddelivery: userInfo.iddelivery,
                    idpackage: idpackage
                }
                const res = await fetch('http://4.246.177.149/api/deliverypackage', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                const data = await res.json()
                alert(data?.message)
                cleanTable(assignedTableBody)
                fetchTable(`getassignedpackages?iddelivery=${userInfo.iddelivery}`, assignedTableBody, 2)
            }
            cellOptionButtonDelivery.innerHTML = `
         <td class="centered">
             <button type="button" class="btn btn-success">Delivery</button>
         </td>
         `

            const buttonDelivery = cellOptionButtonDelivery.querySelector('button');
            buttonDelivery.onclick = deliveryFunction;
            row.append(cellOptionButtonDelivery)
            break;
        default:
            break;


    }

}