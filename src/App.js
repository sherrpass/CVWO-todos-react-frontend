import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "./store/index";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./routing/PrivateRoute";

import Dashboard from "./components/dashboard/Dashboard";

import NotFoundPage from "./components/layout/NotFoundPage";
import Navbar from "./components/layout/NavBar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";

import Alert from "./components/layout/Alert";
// import AddTodoPage from "./components/todos/AddTodoPage";
// import EditTodoPage from "./components/todos/EditTodoPage";
// import TodoDashboard from "./components/todos/TodoDashboard";
// import Categories from "./components/categories/Categories";
// import CategoryPage from "./components/categories/CategoryPage";
const store = configureStore();

const App = () => {
    useEffect(() => {
        setAuthToken(localStorage.getItem("token"));
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <>
                    <Navbar />
                    <Alert />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />

                        {/*<PrivateRoute
                            exact
                            path="/create"
                            component={AddTodoPage}
                        />
                        <PrivateRoute
                            exact
                            path="/edit/:id"
                            component={EditTodoPage}
                        />
                        <PrivateRoute
                            exact
                            path="/categories/:id"
                            component={CategoryPage}
                        />
                        <PrivateRoute
                            exact
                            path="/categories"
                            component={Categories}
                        />*/}

                        <Route component={NotFoundPage} />
                    </Switch>
                </>
            </Router>
        </Provider>
    );
};

export default App;
