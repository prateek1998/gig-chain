import axios from 'axios';

const API_URL =
    process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : 'http://localhost:5000';

const config = {
    header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

// Gigs Calls
export const getAllGigs = function () {
    return axios.get(API_URL + '/api/v1/gigs', config).then((response) => {
        return response.data;
    });
};

// Gigs Calls
export const getAllGigUsers = function () {
    return axios.get(API_URL + '/api/v1/users', config).then((response) => {
        return response.data;
    });
};

export const assignUsersToGig = function (id, data) {
    return axios.post(API_URL + `/api/v1/gigs/${id}/assign`, {assignedUsers:data}, config).then((response) => {
        return response.data;
    });
}


export const updateUserDetails = function (data) {
    return axios.put(API_URL + `/api/v1/users/${data.giggerId}`, data, config).then((response) => {
        return response.data;
    });
}
