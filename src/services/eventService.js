const BASE_URL = 'http://localhost:5000/events';

export const getAll = () => {
    return fetch(BASE_URL)
        .then(res => res.json())
}

export const create = (data) => {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json());
}