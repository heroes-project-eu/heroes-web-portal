//import axios from "axios"

const ENDPOINT = 'https://api.heroes-project.eu'

/*export default async function listBuckets () {

    const jwt = window.sessionStorage.getItem("jwt")

    const url = `${ENDPOINT}/organization/data/list`

    const headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "token": `${jwt}`,
    }
    
    const res = await axios.get(url, headers)
    
    if (!res)
        throw new Error("Error getting buckets")

        console.log(res)
    return res
}
*/

export default function listBuckets () {

    const jwt = window.sessionStorage.getItem("jwt")

    return fetch(`${ENDPOINT}/organization/data/list`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "token": `${jwt}`,
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response is not ok')
    })
}