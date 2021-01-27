import React from "react";
//@ts-ignore
import { Redirect } from "react-router-dom";
//@ts-ignore

import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { RootState } from "../../store/index";

const Login = ({ isAuthenticated }: { isAuthenticated: boolean | null }) => {
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

const mapStateToProps = (state: RootState) => ({
    //toredirect logged in users to the dashboard
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Login);
