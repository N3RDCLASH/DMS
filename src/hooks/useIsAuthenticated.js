import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export const useIsAuthenticated = () => {


    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const user = useSelector(state => state.userLogin.userInfo);
    const history = useHistory();

    useEffect(() => {
        setIsAuthenticated(user !== undefined)
        console.log(isAuthenticated)
        console.log(user)
    }, [user])

    useEffect(() => {
        if (!isAuthenticated) {
            if (history.location.pathname == "/auth/login")
                return
            return history.push("/auth/login")
        }

        if (isAuthenticated && history.location.pathname == "/auth/login") {
            console.log(isAuthenticated, user)
            return history.push('/admin/index')
        }
    }, [history.location, isAuthenticated])


}