import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const NavBar = ({ logout, auth: { loading, isAuthenticated } }) => {
    const guestNavBar = (
        <>
            <div className="navigation">
                <nav className="navigation__nav">
                    <NavLink to="/" className="navigation__name">
                        <i className="fas fa-clipboard"></i> Todoit
                    </NavLink>
                    <div className="navigation__list">
                        <NavLink to="/login" className="navigation__link">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="navigation__link">
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
                        <i className="fas fa-clipboard"></i> Todoit
                    </NavLink>
                    <div className="navigation__list">
                        <NavLink to="/dashboard" className="navigation__link">
                            Dashboard
                        </NavLink>
                        <NavLink to="/pomodoro" className="navigation__link">
                            {" "}
                            {/*to be added*/}
                            Pomodoro
                        </NavLink>
                        <NavLink
                            onClick={logout}
                            to="/"
                            className="navigation__link"
                        >
                            Logout <i className="fas fa-sign-out-alt"></i>
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    );
    return <>{!loading && (isAuthenticated ? authNavBar : guestNavBar)}</>;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavBar);

// <header>
//     <h1>TODO App</h1>
//     <NavLink to="/login">Login</NavLink>
//     <NavLink to="/register">Register</NavLink>
// </header>;
// <header>
//             <h1>TODO App</h1>

//             <NavLink to="/dashboard" exact={true}>
//                 Dashboard
//             </NavLink>
//             <NavLink to="/create">Create</NavLink>
//             <NavLink to="/categories">Categories</NavLink>
//             <NavLink onClick={logout} to="/">
//                 Logout
//             </NavLink>
//         </header>
