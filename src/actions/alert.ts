import { v4 } from "uuid";
import { Action } from "redux";
import { RootState } from "../store/index.js";
import { ThunkAction } from "redux-thunk";
const setAlert = (
    msg: string,
    alertType: string,
    time = 1500
): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    const id = v4();
    dispatch({ type: "SET_ALERT", payload: { id, msg, alertType } });
    setTimeout(() => {
        dispatch({ type: "REMOVE_ALERT", payload: id });
    }, time);
};

export default setAlert;
