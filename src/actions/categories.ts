import axios from "axios";
import setAlert from "./alert";
import { getTodos } from "./todos";
import { Action } from "redux";
import { RootState } from "../store/index.js";
import { ThunkAction } from "redux-thunk";
import { CategoryRequest } from "../allTypes";

export const getCategories = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    try {
        const response = await axios.get(
            process.env.REACT_APP_PROXY + "/api/categories"
        );
        dispatch({ type: "GET_CATEGORIES", payload: response.data });
    } catch (error) {
        dispatch({
            type: "CATEGORY_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};

export const addCategory = ({
    name = "",
    description = "",
}: CategoryRequest): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    try {
        const formData = {
            name,
            description,
        };
        console.log(`addCategory`);
        console.log(formData);
        const response = await axios.post(
            process.env.REACT_APP_PROXY + "/api/categories",
            formData
        );
        dispatch({ type: "ADD_CATEGORY", payload: response.data });
    } catch (error) {
        const errorMsg = error.response.data.message;
        if (errorMsg) {
            dispatch(setAlert(errorMsg, "danger"));
        }
        dispatch({
            type: "CATEGORY_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};

export const editCategory = (
    id: number,
    { name, description }: CategoryRequest
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
    getState
) => {
    try {
        const formData = {
            name,
            description,
        };
        console.log(`editCategory`);
        console.log(formData);
        const response = await axios.put(
            process.env.REACT_APP_PROXY + "/api/categories",
            formData
        );
        dispatch({
            type: "EDIT_CATEGORY",
            payload: { id, category: response.data },
        });
    } catch (error) {
        const errorMsg = error.response.data.message;
        if (errorMsg) {
            dispatch(setAlert(errorMsg, "danger"));
        }
        dispatch({
            type: "CATEGORY_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};

//delete Category
export const deleteCategory = (
    id: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    try {
        console.log(`deleteCategory`);
        await axios.delete(
            process.env.REACT_APP_PROXY + `/api/categories/${id}`
        );
        dispatch({ type: "DELETE_CATEGORY", payload: id });
        dispatch(getTodos()); //to remove this category from all todos
    } catch (error) {
        dispatch({
            type: "CATEGORY_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};

//set active Category
export const setCurrCategory = (id: number | null = null) => ({
    type: "SET_CURR_CATEGORY",
    payload: id,
});
