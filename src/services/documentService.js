import axios from "axios";
import { apiUrl } from "index";

export const createDocument = async ({ document, token }) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fd = new FormData()
    fd.append("file", document)
    console.log({ document, token })
    try {
        await axios.post(`${apiUrl}/documents/upload`, fd, config)
    } catch (error) { throw new Error() }
}

export const fetchDocuments = async ({ queryKey }) => {
    const token = queryKey[1]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/documents`, config)
        return data
    } catch (error) { console.log(error) }
}
export const fetchDocumentsByUser = async ({ queryKey }) => {
    const token = queryKey[1]
    const user_id = queryKey[2]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/documents?user_id=${user_id}`, config)
        return data
    } catch (error) { console.log(error) }
}

export const fetchDocument = async ({ queryKey }) => {
    const token = queryKey[1]
    const id = queryKey[2]
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.get(`${apiUrl}/documents/${id}`, config)
        return data
    } catch (error) { console.log(error) }

}

export const updateDocument = async ({ document, token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await axios.put(`${apiUrl}/documents/${id}`, document, config)
    } catch (error) { console.log(error) }

}

export const deleteDocument = async ({ token, id }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        await axios.delete(`${apiUrl}/documents/${id}`, config)
    } catch (error) {
        console.log(error)
    }
}