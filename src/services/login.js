import axios from 'axios';

const ENDPOINT = 'https://api.heroes-project.eu'

export default async function login ({ username, organization, password }) {
    const data = {
        "username" : username,
        "organization" : organization,
        "password" : password,
    }

    const url = `${ENDPOINT}/organization/auth/login`

    const res = await axios.post(url, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    if (!res)
        throw new Error("Response is not OK");
    
    let token = res.data
    let org = res.data.organization
    return [token, org];
}