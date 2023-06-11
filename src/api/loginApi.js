import { API_HOST } from "../utils/constants";

export async function getUsers() {
    try {
        const url = `${API_HOST}/usuarios`
        const users = await fetch(url)
            .then(response => response.text())
            .then(result => result)
            .catch(error => console.log('error', error));
        return users
    } catch (error) {
        console.log("ERROR GETUSERS ---> " + error);
        throw error;
    }
}

export async function createUser(username, email, password) {
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "nombre": username,
            "password": password,
            "correo": email,
            "rol": "USER_ROLE"
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = `${API_HOST}/usuarios`
        const userInfo = await fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {

                console.log(result)
            })
            .catch(error => {

                console.log('error', error)
            });

        return userInfo
    } catch (error) {
        console.log("ERROR LOGIN ---> " + error);
        throw error;
    }
}

export async function loginApiSesion(email, password) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "correo": email,
        "password": password
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const url = `${API_HOST}/auth/login`

    const userData = await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error API LOGIN ---> ', error));

    return userData;
}