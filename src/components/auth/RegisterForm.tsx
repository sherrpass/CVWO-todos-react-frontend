import React, { useState } from "react";
//@ts-ignore
import validator from "validator";
//@ts-ignore
import { Link } from "react-router-dom";
//@ts-ignore
import { connect, ConnectedProps } from "react-redux";
import { register } from "../../actions/auth";
type Props = PropsFromRedux;
type FormErrors = {
    email?: string;
    password?: string;
    passwordConfirmed?: string;
};
type State = {
    email: string;
    password: string;
    passwordConfirmed: string;
    errors: FormErrors;
};
const RegisterForm = ({ register }: Props) => {
    const [formData, setFormData] = useState<State>({
        email: "",
        password: "",
        passwordConfirmed: "",
        errors: {},
    });
    const { email, password, passwordConfirmed, errors } = formData;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
const connector = connect(mapStateToProps, { register });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(RegisterForm);
