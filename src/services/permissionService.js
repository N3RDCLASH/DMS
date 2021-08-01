import axios from 'axios'
import { apiUrl } from 'index';

export const fetchPermissions = async ({ queryKey }) => {
    const token = queryKey[1]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/permissions`, config)
        return data
    } catch (error) { console.log(error) }
}

export const fetchPermission = async ({ queryKey }) => {
    const token = queryKey[1]
    const id = queryKey[2]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/permissions/${id}`, config)
        return data
    } catch (error) { console.log(error) }

}