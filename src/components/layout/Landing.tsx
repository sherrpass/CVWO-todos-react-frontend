import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../store/index";

type Props = {
    isAuthenticated: boolean | null;
};
const Landing = ({ isAuthenticated }: Props) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <>
            <div className="dashboard">
                <section className="landing-jumbotron">
                    <div className="landing-jumbotron__content">
                        <div className="landing-jumbotron__title">Todoit</div>
                        <div className="landing-jumbotron__divider"></div>
                        <div className="landing-jumbotron__description">
                            A simple, modern and effective task management
                            application.
                        </div>
                        <div className="landing-jumbotron__btn-container">
                            <Link
                                to="/Register"
                                className="btn-primary margin-right-sm"
                            >
                                Register
                            </Link>
                            <Link to="/Login" className="btn-secondary">
                                Login
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
const mapStateToProps = (state: RootState) => {
    return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToProps)(Landing);
