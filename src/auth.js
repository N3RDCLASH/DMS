import axios from 'axios'
import { apiUrl } from 'index'

class Auth {
    constructor() {
        this.authenticated = false
    }

    async login(email, password) {
        // const data = { email, password }
        // const options = {}
        // try {
        //     const { data: token } = await axios.post(`${apiUrl}:3000/login`, data, options)
        //     this.storeJWT(token)
        //     return this.isAuthenticated()
        // } catch (error) {
        //     console.log(error)
        // }
        axios.get(apiUrl)
        console.log(apiUrl)
    }

    logout() {

    }

    isAuthenticated() {
        return this.authenticated
    }

    storeJWT(token) {

    }
    getJWT() {
        let token
        return token
    }
}

export default new Auth()