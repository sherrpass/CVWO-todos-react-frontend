import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import todosReducer from "../reducers/todos";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";
import categoriesReducer from "../reducers/categories";
import alertReducer from "../reducers/alert";
import setAuthToken from "../utils/setAuthToken";
const rootReducer = combineReducers({
    alerts: alertReducer,
    todo: todosReducer,
    filters: filtersReducer,
    auth: authReducer,
    category: categoriesReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
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
        if (currentValue.auth.token !== previousValue.auth.token) {
            setAuthToken(currentValue.auth.token);
        }
    });
    return store;
};
