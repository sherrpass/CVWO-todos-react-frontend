import React, { useState } from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

const RegisterForm = ({ register }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirmed: "",
        errors: {},
    });
    const { email, password, passwordConfirmed, errors } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, errors: {} });
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        const passwordConfirmedValid = validateConfirmedPassword();
        if (emailValid && passwordValid && passwordConfirmedValid) {
            register({ email, password });
        }
    };
    const validateEmail = () => {
        if (validator.isEmpty(email)) {
            setFormData({
                ...formData,
                errors: { ...errors, email: "Email is required." },
            });
        } else if (!validator.isEmail(email)) {
            setFormData({
                ...formData,
                errors: { ...errors, email: "Email must be valid" },
            });
        } else {
            setFormData({
                ...formData,
                errors: { ...errors, email: undefined },
            });
            return true;
        }
        return false;
    };
    const validatePassword = () => {
        if (validator.isEmpty(password)) {
            setFormData({
                ...formData,
                errors: { ...errors, password: "Password is required." },
            });
        } else if (password.length < 8) {
            setFormData({
                ...formData,
                errors: {
                    ...errors,
                    password: "Password must contain at least 8 characters.",
                },
            });
        } else {
            setFormData({
                ...formData,
                errors: {
                    ...errors,
                    password: undefined,
                },
            });
            return true;
        }
        return false;
    };
    const validateConfirmedPassword = () => {
        if (password !== passwordConfirmed) {
            setFormData({
                ...formData,
                errors: {
                    ...errors,
                    passwordConfirmed: "Passwords must match.",
                },
            });
        } else {
            setFormData({
                ...formData,
                errors: {
                    ...errors,
                    passwordConfirmed: undefined,
                },
            });
            return true;
        }
        return false;
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
                        onBlur={validateEmail}
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
                        onBlur={validatePassword}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        placeholder="Confirm your password"
                        type="password"
                        className={
                            "form-control" +
                            (errors.passwordConfirmed ? " is-invalid" : "")
                        }
                        name="passwordConfirmed"
                        value={passwordConfirmed}
                        onChange={onChange}
                        onBlur={validateConfirmedPassword}
                    />
                    <div className="invalid-feedback">
                        {errors.passwordConfirmed}
                    </div>
                </div>

                <button type="submit" className="margin-top-med btn-primary">
                    Register
                </button>
                <div className="margin-top-sm text-muted font-sm">
                    Already have an account? <Link to="/Login">Login</Link>
                </div>
            </form>
        </div>
    );
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, { register })(RegisterForm);
// <Form onSubmit={onSubmit}>
//                 <Form.Group controlId="formEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                         size="lg"
//                         type="email"
//                         name="email"
//                         onChange={onChange}
//                         value={email}
//                         placeholder="Enter email"
//                     />
//                     <Form.Text className="text-muted">
//                         We'll never share your email with anyone else.
//                     </Form.Text>
//                 </Form.Group>
//                 <Form.Group controlId="formPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         size="lg"
//                         type="password"
//                         name="password"
//                         onChange={onChange}
//                         value={password}
//                         placeholder="Enter a password"
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formPasswordConfirmed">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control
//                         size="lg"
//                         type="password"
//                         name="passwordConfirmed"
//                         onChange={onChange}
//                         value={passwordConfirmed}
//                         placeholder="Confirm your password"
//                     />
//                 </Form.Group>
//                 <button type="submit" className="margin-top-med btn-primary">
//                     Register
//                 </button>
//                 <div className="margin-top-sm text-muted font-sm">
//                     Already have an account? <a href="#">Login</a>
//                 </div>
//             </Form>
