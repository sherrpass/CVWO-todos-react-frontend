import React from "react";
import { Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
const Landing = () => {
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

            <div className="dashboard"></div>
        </>
    );
};

export default Landing;
