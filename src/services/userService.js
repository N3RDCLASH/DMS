import axios from 'axios'
import { apiUrl } from 'index';

export const createUser = async ({ user, token }) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await axios.post(`${apiUrl}/users`, user, config)
    } catch (error) { console.log(error) }
}

export const fetchUsers = async ({ queryKey }) => {
    const token = queryKey[1]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/users`, config)
        return data
    } catch (error) { console.log(error) }
}

export const fetchUser = async ({ queryKey }) => {
    const token = queryKey[1]
    const id = queryKey[2]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/users/${id}`, config)
        return data
    } catch (error) { console.log(error) }

}

export const updateUser = async ({ user, token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await axios.put(`${apiUrl}/users/${id}`, user, config)
    } catch (error) { console.log(error) }

}

export const deleteUser = async ({ token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        await axios.delete(`${apiUrl}/users/${id}`, config)
    } catch (error) {
        console.log(error)
    }
}


export const addRoleToUser = async ({ role, token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {

        await axios.post(`${apiUrl}/users/${id}`, role, config)
    } catch (error) {
        console.log(error)
    }
}

export const removeRoleFromUser = async ({ role, token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        await axios.delete(`${apiUrl}/users/${id}/roles`, { ...config, data: { ...role } })
    } catch (error) {
        console.log(error)
    }

}
