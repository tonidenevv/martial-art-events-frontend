const BASE_URL = 'http://localhost:5000/events';

export const getAll = () => {
    return fetch(BASE_URL)
        .then(res => res.json())
}

export const create = (data, token) => {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorize: token,
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

export const getOne = (id) => {
    return fetch(`${BASE_URL}/${id}`)
        .then(res => res.json())
}

export const edit = (id, data, token, eventOwnerId) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            authorize: token,
            eventOwnerId
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

export const del = (id, token, eventOwnerId) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorize: token,
            eventOwnerId,
        }
    })
        .then(res => res.json());
}

export const comment = (comment, eventId, token, eventOwnerId) => {
    return fetch(`${BASE_URL}/${eventId}/comment`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorize: token,
            eventOwnerId,
        },
        body: JSON.stringify({ comment })
    })
        .then(res => res.json());
}

export const attend = (eventId, eventOwnerId, token) => {
    return fetch(`${BASE_URL}/${eventId}/attend`, {
        method: 'POST',
        headers: {
            Authorize: token,
            eventOwnerId,
        },
    })
        .then(res => res.json());
}

export const getOwnedById = (ownerId) => {
    return fetch(`${BASE_URL}/owned/${ownerId}`)
        .then(res => res.json());
}

export const getAttendingTo = (ownerId) => {
    return fetch(`${BASE_URL}/attending/${ownerId}`)
        .then(res => res.json());
}