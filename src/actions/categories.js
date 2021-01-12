import axios from "axios";
import setAlert from "./alert";
import { getTodos } from "./todos";
export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get(
            process.env.REACT_APP_PROXY + "/api/categories"
        );
        console.log("getCategories");
        console.log(response.data);
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

export const addCategory = ({ name = "", description = "" } = {}) => async (
    dispatch
) => {
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

export const editCategory = (id, { name, description }) => async (
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
            `https://cvwo-todo-rails-backend.herokuapp.com/api/categories/${id}`,
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
export const deleteCategory = (id) => async (dispatch) => {
    try {
        console.log(`deleteCategory`);
        await axios.delete(
            `https://cvwo-todo-rails-backend.herokuapp.com/api/categories/${id}`
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
export const setCurrCategory = (id = null) => ({
    type: "SET_CURR_CATEGORY",
    payload: id,
});
