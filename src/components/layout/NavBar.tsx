import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "../../actions/auth";
import webIcon from "../../images/webIcon.png";
import { RootState } from "../../store/index";
type Props = PropsFromRedux;

const NavBar = ({ logout, auth: { loading, isAuthenticated } }: Props) => {
    const [largeWidth, setLargeWidth] = useState(
        window.matchMedia("(min-width: 768px)").matches
    );
    useEffect(() => {
        const handler = (e: MediaQueryListEvent) => {
            setLargeWidth(e.matches);
        };
        window.matchMedia("(min-width: 768px)").addListener(handler);
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
                                (largeWidth ? " large" : " small")
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={
                                "navigation__link" +
                                (largeWidth ? " large" : " small")
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
                        <NavLink
                            to="/dashboard"
                            className={
                                "navigation__link" +
                                (largeWidth ? " large" : " small")
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/pomodoro"
                            className={
                                "navigation__link" +
                                (largeWidth ? " large" : " small")
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
                                (largeWidth ? " large" : " small")
                            }
                        >
                            {largeWidth && <span>Logout</span>}{" "}
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
