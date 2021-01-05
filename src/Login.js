import React from "react";
import LoginForm from "./LoginForm";
const Login = () => {
    return (
        <>
            <div className="navigation">
                <nav className="navigation__nav">
                    <div className="navigation__name">
                        <i className="fas fa-clipboard"></i>
                        Todoify
                    </div>
                    <div className="navigation__list">
                        <a href="#" className="navigation__link">
                            Dashboard
                        </a>
                        <a href="#" className="navigation__link">
                            Pomodoro
                        </a>
                        <a href="#" className="navigation__link">
                            Logout
                            <i className="fas fa-sign-out-alt"></i>
                        </a>
                    </div>
                </nav>
            </div>

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

export default Login;
