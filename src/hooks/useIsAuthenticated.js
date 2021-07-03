import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export const useIsAuthenticated = () => {


    const user = useSelector(state => state.userLogin.userInfo);
    const history = useHistory();

    useEffect(() => {
        const isAuthenticated = Object.keys(Object).length == 0 ? true : false

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

    }, [history.location], user)


}