import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "constants/userConstants";
import { apiUrl } from "index";



// const dispatch = useDispatch()
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        // request options 
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        // 
        const { data } = await axios.post(`${apiUrl}/login`, { email, password }, options);


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("DMS_USER", JSON.stringify(data));

    } catch (error) {
        console.log(error)
        //dispatch login failed reducer
        // dispatch({
        //     type: USER_LOGIN_FAILED,
        // });
        // // const message =
        // //     error.response && error.response.data.status
        // //         ? error.response.data.message
        // //         : error.message;
        // // if (message === "Not authorized, token failed") {
        // //     dispatch({ type: USER_LOGOUT });
        // // }
        // dispatch({
        //     type: USER_LOGIN_FAIL,
        //     payload: message,
        // });
    }
}

