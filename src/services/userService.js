import axios from 'axios'
import { apiUrl } from 'index';

export const fetchAllUsers = async ({ queryKey }) => {
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