import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import todosReducer from "../reducers/todos";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";
import categoriesReducer from "../reducers/categories";
import alertReducer from "../reducers/alert";
import setAuthToken from "../utils/setAuthToken";

export default () =>{ 
    const store = createStore(
        combineReducers({
            alerts: alertReducer,
            todo:todosReducer,
            filters: filtersReducer,
            auth: authReducer,
            category: categoriesReducer
        }), composeWithDevTools(applyMiddleware(thunk))
    )
    let currentValue = {
        auth: {
            token: localStorage.getItem("token"),
            isAuthenticated: null,
            loading: true,
            user: null,
        },
    };

    store.subscribe(() => {
        let previousValue = currentValue;
        currentValue = store.getState();
            // console.log({ previousValue, currentValue });
        if (currentValue.auth.token !== previousValue.auth.token) {
            // console.log("triggered");
            setAuthToken(currentValue.auth.token);
        }
    });
    return store;
}