import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export const useIsAuthenticated = () => {


    const user = useSelector(state => state.userLogin.userInfo);
    const history = useHistory();

    useEffect(() => {
        const isAuthenticated = Object.keys(Object).length == 0 ? true : false

        if (!isAuthenticated) {
            if (history.location.pathname == "/auth/login") {
                console.log('case1', user, isAuthenticated)
                return
            }
            console.log('case2', user, isAuthenticated)
            return history.push("/auth/login")
        }

        if (isAuthenticated) {
            if (history.location.pathname == "/auth/login") {
                console.log('case3', user, isAuthenticated)
                return history.push('/app/home')
            }

            console.log('case4', user, isAuthenticated)
            return
        }

    }, [history.location], user)


}