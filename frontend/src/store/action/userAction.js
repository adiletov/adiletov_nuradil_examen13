import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";
import {toast} from "react-toastify";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';


export const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserError = error => ({type: REGISTER_USER_ERROR, error});

export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserError = error => ({type: LOGIN_USER_ERROR, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});

export const registerUser = userData => {
    return async (dispatch) => {
        try {
            dispatch(registerUserRequest());
            const res = await axiosApi.post('/users', userData);
            toast.success(res.data.message);
            dispatch(registerUserSuccess(res.data.user));
            dispatch(push('/'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserError(e.response.data))
            } else {
                dispatch(registerUserError({error: 'Server ERROR!!!'}))
            }
        }
    }
};

export const loginUser = userData => {
    return async (dispatch) => {
        try {
            dispatch(loginUserRequest());
            const res = await axiosApi.post('/users/sessions', userData);
            toast.success(res.data.message);
            dispatch(loginUserSuccess(res.data.user));
            dispatch(push('/'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserError(e.response.data))
            } else {
                dispatch(loginUserError({error: 'Server ERROR!!!'}))
            }
        }
    }
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        dispatch(logoutUserRequest());
        const res = await axiosApi.delete('/users/sessions', config);
        toast.success(res.data.message);
        dispatch(logoutUserSuccess())
    }
};
