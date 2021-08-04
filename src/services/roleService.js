import axios from 'axios'
import { apiUrl } from 'index';

export const createRole = async ({ role, token }) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await axios.post(`${apiUrl}/roles`, role, config)
    } catch (error) { throw new Error() }
}

export const fetchRoles = async ({ queryKey }) => {
    const token = queryKey[1]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/roles`, config)
        return data
    } catch (error) { throw new Error() }
}

export const fetchRole = async ({ queryKey }) => {
    const token = queryKey[1]
    const id = queryKey[2]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/roles/${id}`, config)
        return data
    } catch (error) { throw new Error() }

}

export const updateRole = async ({ role, token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await axios.put(`${apiUrl}/roles/${id}`, role, config)
    } catch (error) { throw new Error() }

}

export const deleteRole = async ({ token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        await axios.delete(`${apiUrl}/roles/${id}`, config)
    } catch (error) {
        throw new Error()
    }
}


export const addPermissionToRole = async ({ permission, token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {

        await axios.post(`${apiUrl}/roles/${id}`, permission, config)
    } catch (error) {
        throw new Error()
    }
}

export const removePermissionFromRole = async ({ permission, token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        await axios.delete(`${apiUrl}/roles/${id}/permissions`, { ...config, data: { ...permission } })
    } catch (error) {
        throw new Error()
    }

}
