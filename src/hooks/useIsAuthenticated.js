import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export const useIsAuthenticated = () => {


    const isAuthenticated = useSelector(state => state.userLogin.userInfo !== undefined ? state.userLogin.userInfo : null)
    const history = useHistory();

    useEffect(() => {

        console.log(isAuthenticated)

        if (!isAuthenticated) {
            if (history.location.pathname == "/auth/login")
                return

            return history.push("/auth/login")
        }

        if (isAuthenticated) {
            if (history.location.pathname == "/")
                return history.push('/app/home')

            if (history.location.pathname == "/auth/login")
                return history.push('/app/home')
            return
        }

    }, [history.location, isAuthenticated])


}