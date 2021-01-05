import axios from "axios";
import setAlert from "./alert"

//get Todos
export const getTodos = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/todos");
        // console.log("getTodos");
        // console.log(response.data);
        const tailored_data = response.data.map(({todo, categories}) => ({...todo, categories}))
        dispatch({ type: "GET_TODOS", payload: tailored_data});
    } catch (error) {
        console.log("getTodos error")
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};
//add todo
export const addTodo = ({
    title = "Default",
    description = "",
    completed = false,
    created_at = 0, //in ms from unix epoch
    due_by = null, //in ms from unix epoch, default is null for functionality of airbnb react-dates
    important = false,
    category_ids = ""//expects the category_ids to be a string of category ids the todo belongs to separated by spaces ***
} = {}) => async (dispatch) => {
    try{
        console.log("addTodo category_ids:");
        console.log(category_ids);
        const formData = {
            title, description, completed, created_at, important, due_by, category_ids
        }
        console.log(formData);
        await axios.post("/api/todos", formData);
        
        // dispatch({type:"ADD_TODO", payload: response.data})
    }catch(error){
        
        const errorMsg = error.response.data.message;
        if (errorMsg) { 
            dispatch(setAlert(errorMsg, "danger"));
        }
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
}

//edit Todo
export const editTodo = (id, {title, description, completed, due_by, created_at, important, category_ids = ""}) => async (dispatch) => {
    try{
        console.log("editTodo action category_ids:")
        console.log(category_ids);
        const formData = {
            title, description, completed, created_at, important, due_by, category_ids
        };
        console.log(formData);
        await axios.put(`/api/todos/${id}`, formData);
        // dispatch({type:"ADD_TODO", payload: response.data})
    }catch(error){
        console.log("editTodo error");
        const errorMsg = error.response.data.message;
        if (errorMsg) { 
            dispatch(setAlert(errorMsg, "danger"));
        }
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
}

//delete Todo
export const deleteTodo = (id) => async (dispatch) => {
  try{
      // console.log(`editTodo`);
      // console.log(formData);
      await axios.delete(`/api/todos/${id}`);
      dispatch({type:"DELETE_TODO", payload: id})
  }catch(error){
      console.log("deleteTodo error");
      dispatch({
          type: "TODO_ERROR",
          payload: {
              msg: error.response.data.message,
              status: error.response.status,
          },
      });
  }
}

//complete Todo
export const completeTodo = (id) => async (dispatch) => {
    try{
        // console.log(`editTodo`);
        // console.log(formData);
        const formData = {
        completed: true
        }
        await axios.put(`/api/todos/${id}`,formData);
        dispatch({type: "COMPLETE_TODO", payload:id})
    }catch(error){
        console.log("completeTodo error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
  }
}

//change importance
export const toggleImportanceTodo = (id) => async (dispatch, getState) => {
    try{
        // console.log(`editTodo`);
        // console.log(formData);
        const prevImportance = getState().todo.todos.find((todo) => todo.id === id).important;
        const formData = {
            important: !prevImportance
        }
        await axios.put(`/api/todos/${id}`,formData);
        dispatch({type: "TOGGLE_IMPORTANCE_TODO", payload:id})
    }catch(error){
        console.log("toggleImportanceTodo error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
}

//clear all completed
export const clearCompletedTodos = () => async (dispatch) => {
    try{
        await axios.delete(`/api/todos/completed`);
        dispatch({type:"CLEAR_ALL_COMPLETED_TODOS"})
    }catch(error){
        console.log("clearCompletedTodos error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
}
// export const clearCompletedTodos = () => ({
//     type:"CLEAR_ALL_COMPLETED_TODOS"
// })