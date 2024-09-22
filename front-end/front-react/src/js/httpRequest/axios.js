import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/v1.0.0/';

export async function postRequest(url, data) {
    try {
        const response = await axios.post(`${apiUrl}${url}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function formDataRequest(url, data) {
    try {
        const response = await axios.post(`${apiUrl}${url}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getRequest(url) {
    try {
        const response = await axios.get(`${apiUrl}${url}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTokenRequest(header_token) {
    try {
        const url = 'login'
        const response = await axios.get(`${apiUrl}${url}`, {
            headers: {
                'Authorization': `Bearer ${header_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteRequest(url, id) {
    try {
        const response = await axios.delete(`${apiUrl}${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}