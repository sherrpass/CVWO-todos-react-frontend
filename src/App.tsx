import React, { useEffect } from "react";
//@ts-ignore
import { Provider } from "react-redux";
//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "./store/index";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./routing/PrivateRoute";

import Dashboard from "./components/dashboard/Dashboard";
import Pomodoro from "./components/pomodoro/Pomodoro";

import Navbar from "./components/layout/NavBar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";

import Alert from "./components/layout/Alert";
const store = configureStore();

const App = () => {
    useEffect(() => {
        setAuthToken(localStorage.getItem("token"));
        // @ts-ignore
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
                        <PrivateRoute
                            exact
                            path="/pomodoro"
                            component={Pomodoro}
                        />
                        <Route component={Landing} />
                    </Switch>
                </>
            </Router>
        </Provider>
    );
};

export default App;
