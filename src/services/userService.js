import axios from 'axios'
import { apiUrl } from 'index';

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

