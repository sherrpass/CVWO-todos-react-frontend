import axios from "axios";
import setAlert from "./alert";

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/categories");
        console.log("getCategories");
        console.log(response.data);
        dispatch({ type: "GET_CATEGORIES", payload: response.data});
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
    name = ""
} = {}) => async (dispatch) => {
    try{
        const formData = {
            name
        }
        console.log(`addCategory`);
        console.log(formData);
        const response = await axios.post("/api/categories", formData);
        dispatch({type:"ADD_CATEGORY", payload: response.data})
    }catch(error){
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
}

export const editCategory = (id, {name}) => async (dispatch, getState) => {
    try{
        
        const formData = {
            name
        };
        console.log(`editCategory`);
        console.log(formData);
        const response = await axios.put(`/api/categories/${id}`, formData);
        dispatch({type:"EDIT_CATEGORY", payload: {id, category: response.data}})
    }catch(error){
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
  }
  
  //delete Category
  export const deleteCategory = (id) => async (dispatch) => {
    try{
        console.log(`deleteCategory`);
        await axios.delete(`/api/categories/${id}`);
        dispatch({type:"DELETE_CATEGORY", payload: id})
    }catch(error){
        dispatch({
            type: "CATEGORY_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
  }