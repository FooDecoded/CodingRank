import axios from 'axios';

export const createCollobrationSpace = () => {
    return axios.post(`/api/shared_spaces/create`)
}

export const joinCollobrationSpace = (id) => {
    return axios.get(`/api/shared_spaces/${id}`)
}
