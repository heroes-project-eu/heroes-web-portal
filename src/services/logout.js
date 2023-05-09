const ENDPOINT = 'https://api.heroes-project.eu'

export default function logout () {

    const jwt = window.sessionStorage.getItem("jwt")

    return fetch(`${ENDPOINT}/organization/auth/logout`, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "token": `${jwt}`,
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response is not ok')
    })
}