import { createContext } from 'react'



// Default behaviour for the Permission Provider Context
// i.e. if for whatever reason the consumer is used outside of a provider.
// The permission will not be granted unless a provider says otherwise
const defaultBehaviour = {
    isAllowedTo: () => false
}

// Create the context
const PermissionContext = createContext(defaultBehaviour);


export default PermissionContext