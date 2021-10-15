// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

import PermissionContext from "context/permissionContext"
import { useContext } from "react"

const useHasPermission = () => {

    const { isAllowedTo } = useContext(PermissionContext)
    return [isAllowedTo]


}

export default useHasPermission
