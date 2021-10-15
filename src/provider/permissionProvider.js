import PermissionContext from 'context/permissionContext'
import React from 'react'
import { useSelector } from 'react-redux'

function PermissionProvider({ children }) {
    const user = useSelector(state => state.userLogin.userInfo)
    const userPermission = user?.roles?.map(role => role.permissions).flat()

    const isAllowedTo = (permission) => userPermission?.find(permissionToCompare => permissionToCompare.name == permission) ? true : false

    return <PermissionContext.Provider value={{ isAllowedTo }} >{children}</PermissionContext.Provider>
}
export default PermissionProvider
