import axios from "axios";
import setAlert from "./alert";
import { Action } from "redux";
import { RootState } from "../store/index.js";
import { ThunkAction } from "redux-thunk";
import { TodoRequest, Category, Todo } from "../allTypes";

type Response = {
    todo: Omit<Todo, "categories">;
    categories: Category[];
};
//get Todos
export const getTodos = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    try {
        const response = await axios.get(
            process.env.REACT_APP_PROXY + "/api/todos"
        );
        const tailoredData = response.data.map(
            ({ todo, categories }: Response) => ({
                ...todo,
                categories,
            })
        );
        dispatch({ type: "GET_TODOS", payload: tailoredData });
    } catch (error) {
        console.log("getTodos error");
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
    category_ids = "", //expects the category_ids to be a string of category ids the todo belongs to separated by spaces ***
    cart = false,
}: TodoRequest): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    try {
        console.log("addTodo category_ids:");
        console.log(category_ids);
        const formData = {
            title,
            description,
            completed,
            created_at,
            important,
            due_by,
            category_ids,
            cart,
        };
        const response = await axios.post(
            process.env.REACT_APP_PROXY + "/api/todos",
            formData
        );
        const tailoredData = {
            ...response.data.todo,
            categories: response.data.categories,
        };
        dispatch({ type: "ADD_TODO", payload: tailoredData });
    } catch (error) {
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
};

//edit Todo
export const editTodo = (
    id: number,
    {
        title,
        description,
        completed,
        due_by,
        created_at,
        important,
        category_ids = "",
        cart = false,
    }: TodoRequest
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    try {
        console.log("editTodo action category_ids:");
        console.log(category_ids);
        const formData = {
            title,
            description,
            completed,
            created_at,
            important,
            due_by,
            category_ids,
            cart,
        };
        const response = await axios.put(
            process.env.REACT_APP_PROXY + `/api/todos/${id}`,
            formData
        );
        const tailoredData = {
            ...response.data.todo,
            categories: response.data.categories,
        };
        dispatch({ type: "EDIT_TODO", payload: tailoredData });
    } catch (error) {
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
};

//delete Todo
export const deleteTodo = (
    id: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    try {
        await axios.delete(process.env.REACT_APP_PROXY + `/api/todos/${id}`);
        dispatch({ type: "DELETE_TODO", payload: id });
    } catch (error) {
        console.log("deleteTodo error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};

//complete Todo
export const toggleCompleteTodo = (
    id: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
    getState
) => {
    try {
        const prevTodo = getState().todo.todos.find((todo) => todo.id === id);
        if (prevTodo) {
            const prevCompleted = prevTodo.completed;
            const formData = {
                completed: !prevCompleted,
            };
            await axios.put(
                process.env.REACT_APP_PROXY + `/api/todos/${id}`,
                formData
            );
            dispatch({ type: "TOGGLE_COMPLETE_TODO", payload: id });
        } else {
            console.log("toggleCompleteTodo error");
        }
    } catch (error) {
        console.log("togglecompleteTodo error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};

//change importance
export const toggleImportanceTodo = (
    id: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
    getState
) => {
    try {
        const prevTodo = getState().todo.todos.find((todo) => todo.id === id);
        if (prevTodo) {
            const prevImportance = prevTodo.important;
            const formData = {
                important: !prevImportance,
            };
            await axios.put(
                process.env.REACT_APP_PROXY + `/api/todos/${id}`,
                formData
            );
            dispatch({ type: "TOGGLE_IMPORTANCE_TODO", payload: id });
        } else {
            console.log("toggleImportanceTodo error");
        }
    } catch (error) {
        console.log("toggleImportanceTodo error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};
export const toggleCartTodo = (
    id: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
    getState
) => {
    try {
        const prevTodo = getState().todo.todos.find((todo) => todo.id === id);
        if (prevTodo) {
            const prevCart = prevTodo.cart;
            const formData = {
                cart: !prevCart,
            };
            await axios.put(
                process.env.REACT_APP_PROXY + `/api/todos/${id}`,
                formData
            );
            dispatch({ type: "TOGGLE_CART_TODO", payload: id });
        } else {
            console.log("toggleCartTodo error");
        }
    } catch (error) {
        console.log("toggleCartTodo error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};

//clear all completed
export const clearCompletedTodos = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    try {
        await axios.delete(
            process.env.REACT_APP_PROXY + `/api/todos/completed`
        );
        dispatch({ type: "CLEAR_ALL_COMPLETED_TODOS" });
    } catch (error) {
        console.log("clearCompletedTodos error");
        dispatch({
            type: "TODO_ERROR",
            payload: {
                msg: error.response.data.message,
                status: error.response.status,
            },
        });
    }
};
