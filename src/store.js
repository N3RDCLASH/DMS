import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from 'reducers/userReducers';
import { applyMiddleware, combineReducers } from 'redux'
import { createStore } from 'redux';
import thunk from 'redux-thunk';


const reducer = combineReducers({
    userLogin: userLoginReducer,
});


const getUserInfoFromStorage = localStorage.getItem("DMS_USER") ? JSON.parse(localStorage.getItem("DMS_USER")) : null


const initialState = {
    userLogin: {
        userInfo: {
            ...getUserInfoFromStorage

        }
    }
}
//  Thunk: delay dispatch actions 
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store