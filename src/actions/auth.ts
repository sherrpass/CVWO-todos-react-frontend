import axios from "axios";
import setAlert from "./alert";
import { Action } from "redux";
import { RootState } from "../store/index.js";
import { ThunkAction } from "redux-thunk";
import { UserRequest } from "../allTypes";
import { setCurrCategory } from "./categories";

//register user
export const register = ({
    email,
    password,
}: UserRequest): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    const formData = { email, password };
    try {
        console.log("hi");
        const response = await axios.post(
            process.env.REACT_APP_PROXY + "/api/users",
            formData
        );
        console.log(response.data);
        dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
        dispatch(setAlert("Registered Successfully!", "success"));
    } catch (error) {
        const errorMsg = error.response.data.message;
        if (errorMsg) {
            dispatch(setAlert(errorMsg, "danger"));
        }
        dispatch({ type: "REGISTER_FAIL" });
    }
};

//login user
export const login = ({
    email,
    password,
}: UserRequest): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    const formData = { email, password };
    try {
        console.log("reached login action generator");
        const response = await axios.post(
            process.env.REACT_APP_PROXY + "/api/login",
            formData
        );
        console.log(response);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        dispatch(
            setAlert("Logged in as " + response.data.user.email, "success")
        );
    } catch (error) {
        const errorMsg = error.response.data.message;
        if (errorMsg) {
            dispatch(setAlert(errorMsg, "danger"));
        }
        dispatch({ type: "LOGIN_FAIL" });
    }
};

export const loadUser = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    try {
        const response = await axios.get(
            process.env.REACT_APP_PROXY + "/api/auto_login"
        );
        dispatch({ type: "USER_LOADED", payload: response.data });
        dispatch(setAlert("Logged in as " + response.data.email, "success"));
    } catch (error) {
        dispatch({ type: "AUTH_ERROR" });
    }
};

export const logout = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => (dispatch) => {
    dispatch(setCurrCategory());
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "DELETE_ALL_TODOS" });
    dispatch({ type: "DELETE_ALL_CATEGORIES" });
    dispatch(setAlert("Logged out", "success"));
};
