
class Auth {
    constructor() {
        this.authenticated = false
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