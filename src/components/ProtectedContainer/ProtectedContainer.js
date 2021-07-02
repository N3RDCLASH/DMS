import { useIsAuthenticated } from "hooks/useIsAuthenticated"

export const ProtectedContainer = (props) => {

    const isAuthenticated = useIsAuthenticated()


    return (
        <>
            {isAuthenticated}
            {props.children}
        </>
    )
}