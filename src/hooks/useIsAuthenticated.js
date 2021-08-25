import { logout } from "actions/userActions";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export const useIsAuthenticated = () => {


    const isAuthenticated = useSelector(function (state) {
        if (state === undefined || state === null) {
            return null
        }
        if (typeof (state) === "object") {
            if (state?.userLogin?.userInfo && Object.keys(state?.userLogin?.userInfo).length == 0) {
                return null
            }
            if (state.userLogin.userInfo !== undefined) {
                return state.userLogin.userInfo
            }
        }
    })
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {

        // console.log(isAuthenticated)

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

    useEffect(() => {
        if (new Date() > new Date(isAuthenticated?.expires_at)) {
            dispatch(logout())
        }
    })

}