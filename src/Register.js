import React from "react";
import RegisterForm from "./RegisterForm";
const Register = () => {
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
                        <span className="heading-primary">Sign Up</span>
                    </div>
                    <div className="register__form">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
