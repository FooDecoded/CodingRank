import axios from 'axios';

export const getRubySolution = problemId => {
    return axios.get(`/api/solutions/Ruby/${problemId}`)
};

export const getJSSolution = problemId => {
    return axios.get(`/api/solutions/JS/${problemId}`)
};


// Skip
export const skipToNextRubyProblem = (problemId) => {
    return axios.post(`/api/solutions/Ruby/${problemId}`, { skip: true })
}

// Skip
export const skipToNextJSProblem = (problemId) => {
    return axios.post(`/api/solutions/JS/${problemId}`, {skip: true})
}

export const writeRubySolution = (data, problemId) => {
    return axios.post(`/api/solutions/Ruby/${problemId}`, {code: data})
}

export const writeJSSolution = (data, problemId) => {
    return axios.post(`/api/solutions/JS/${problemId}`, {code: data})
}

export const commentToSolution = (data) => {
    // data will have the comment, problemId, solutionId and language
    return axios.post(`/api/solutions/addComment`, data)
}

export const upvoteSolution = (data) => {
    return axios.post(`api/solutions/upVote`, data)
}