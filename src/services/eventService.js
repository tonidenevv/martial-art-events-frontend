const BASE_URL = 'http://localhost:5000/events';

export const getAll = () => {
    return fetch(BASE_URL)
        .then(res => res.json())
}