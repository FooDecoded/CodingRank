import axios from 'axios';

export const getRubyProblem = () => {
    // debugger
    return axios.get(`/api/problems/Ruby`)
}




export const getJSProblem = () => {
    return axios.get(`/api/problems/JS`)
}
