import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";

const Login = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div className="register__dashboard">
                <div className="register__container">
                    <div className="register__title">
                        <span className="heading-primary">Login</span>
                    </div>
                    <div className="register__form">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    //toredirect logged in users to the dashboard
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Login);
