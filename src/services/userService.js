const BASE_URL = 'https://martial-art-events-backend.vercel.app/users'
export const register = (data) => {
    return fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

export const login = (data) => {
    return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json());
}

export const logout = (token) => {
    return fetch(`${BASE_URL}/logout`, {
        headers: {
            Authorize: token,
        },
    })
        .then(res => res.json());
}