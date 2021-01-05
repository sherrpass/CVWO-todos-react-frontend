import { Route, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import Loading from "../components/layout/Loading";

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(
                props //need to implement Spinner loading component to be rendered as loadUser is being executed. (isAuthenticated=false, loading=true and their is a token)
            ) => {
                if (loading) {
                    return <Loading />;
                } else {
                    if (isAuthenticated) {
                        return <Component {...props} />;
                    } else {
                        return <Redirect to="/login" />;
                    }
                }
            }}
        />
    );
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
};
export default connect(mapStateToProps)(PrivateRoute);
