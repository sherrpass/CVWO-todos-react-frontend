import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "../../actions/auth";
import webIcon from "../../images/webIcon.png";
import { RootState } from "../../store/index";
type Props = PropsFromRedux;

const NavBar = ({ logout, auth: { loading, isAuthenticated } }: Props) => {
    const [screenSize, setScreenSize] = useState(
        window.matchMedia("(min-width: 768px)").matches
            ? 3
            : window.matchMedia("(min-width: 410px)").matches
            ? 2
            : 1
    );
    useEffect(() => {
        const handler2 = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setScreenSize(3);
            } else {
                setScreenSize(2);
            }
        };
        const handler1 = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setScreenSize(2);
            } else {
                setScreenSize(1);
            }
        };
        window.matchMedia("(min-width: 768px)").addListener(handler2);
        window.matchMedia("(min-width: 410px)").addListener(handler1);
    }, []);
    const guestNavBar = (
        <>
            <div className="navigation">
                <nav className="navigation__nav">
                    <NavLink to="/" className="navigation__name">
                        <img src={webIcon} alt="Icon" className="web-icon" />{" "}
                        Todoit
                    </NavLink>
                    <div className="navigation__list">
                        <NavLink
                            to="/login"
                            className={
                                "navigation__link" +
                                (screenSize === 3 ? " large" : " small")
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={
                                "navigation__link" +
                                (screenSize === 3 ? " large" : " small")
                            }
                        >
                            Sign Up
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    );
    const authNavBar = (
        <>
            <div className="navigation">
                <nav className="navigation__nav">
                    <NavLink to="/" className="navigation__name">
                        <img src={webIcon} alt="Icon" className="web-icon" />{" "}
                        Todoit
                    </NavLink>
                    <div className="navigation__list">
                        {screenSize !== 1 && (
                            <NavLink
                                to="/dashboard"
                                className={
                                    "navigation__link" +
                                    (screenSize === 3 ? " large" : " small")
                                }
                            >
                                Dashboard
                            </NavLink>
                        )}
                        <NavLink
                            to="/pomodoro"
                            className={
                                "navigation__link" +
                                (screenSize === 3 ? " large" : " small")
                            }
                        >
                            {" "}
                            {/*to be added*/}
                            Pomodoro
                        </NavLink>
                        <NavLink
                            onClick={logout}
                            to="/"
                            className={
                                "navigation__link" +
                                (screenSize === 3 ? " large" : " small")
                            }
                        >
                            {screenSize === 3 && <span>Logout</span>}{" "}
                            <i className="fas fa-sign-out-alt"></i>
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    );
    return <>{!loading && (isAuthenticated ? authNavBar : guestNavBar)}</>;
};

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
});
const connector = connect(mapStateToProps, { logout });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(NavBar);
