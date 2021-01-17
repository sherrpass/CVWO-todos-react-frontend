import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import validator from "validator";

const LoginForm = ({ login }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        errors: {},
    });
    const { email, password, errors } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, errors: {} });
        let errors = {};
        if (validator.isEmpty(email)) {
            errors.email = "Email is required.";
        } else if (!validator.isEmail(email)) {
            errors.email = "Email must be valid";
        }
        if (validator.isEmpty(password)) {
            errors.password = "Password is required.";
        }
        if (Object.values(errors).length === 0) {
            login({ email, password });
        } else {
            setFormData({ ...formData, errors });
        }
    };

    return (
        <div>
            <form noValidate onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        placeholder="Enter your email"
                        className={
                            "form-control" + (errors.email ? " is-invalid" : "")
                        }
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        placeholder="Enter a password"
                        type="password"
                        className={
                            "form-control" +
                            (errors.password ? " is-invalid" : "")
                        }
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                </div>
                <button type="submit" className="margin-top-med btn-primary">
                    Login
                </button>
                <div className="margin-top-sm text-muted font-sm">
                    New? <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { login })(LoginForm);
