const apiUrl = 'http://localhost:3300/api/v1'
let accessToken;

document.getElementById('login').onclick = async () => {
    const rawResponse = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "mariuszek2131", 
            password: 'kowalski2137'
        })
    });
    accessToken = (await rawResponse.json())?.accessToken;
    console.log(accessToken);
}

document.getElementById('refresh').onclick = async () => {
    const rawResponse = await fetch(`${apiUrl}/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    accessToken = (await rawResponse.json()).accessToken;
    console.log(accessToken);
}

document.getElementById('logout').onclick = async () => {
    const rawResponse = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

document.getElementById('getAllPets').onclick = async () => {
    const rawResponse = await fetch(`${apiUrl}/pets?userid=4`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    });
    console.log(await rawResponse.json());
}

document.getElementById('createPet').onclick = async () => {
    const rawResponse = await fetch(`${apiUrl}/pets`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            gender: 'F',
            dateOfBirth: '14/02/2024',
            description: 'asd',
            name: 'Mariusz'
        })
    });
}

document.getElementById('deletePet').onclick = async () => {
    const petId = document.getElementById('dpInput').value
    const rawResponse = await fetch(`${apiUrl}/pets/${petId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    });
}

document.getElementById('sharePetAccess').onclick = async () => {
    const petId = document.getElementById('dpInput').value;
    const rawResponse = await fetch(`${apiUrl}/pets/${petId}/access`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            'userid': '2',
            'accessLevel': '1'
        })
    });
    console.log(await rawResponse.json());
}

document.getElementById('deletePetAccess').onclick = async () => {
    const petId = document.getElementById('dpInput').value;
    const rawResponse = await fetch(`${apiUrl}/pets/${petId}/access`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            'userid': '2'
        })
    });
}