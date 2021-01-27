import React, { useState } from "react";
//@ts-ignore
import { Link } from "react-router-dom";
//@ts-ignore
import { connect, ConnectedProps } from "react-redux";
import { login } from "../../actions/auth";
//@ts-ignore
import validator from "validator";
type Props = PropsFromRedux;
type FormErrors = { email?: string; password?: string };
type State = {
    email: string;
    password: string;
    errors: FormErrors;
};
const LoginForm = ({ login }: Props) => {
    const [formData, setFormData] = useState<State>({
        email: "",
        password: "",
        errors: {},
    });
    const { email, password, errors } = formData;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({ ...formData, errors: {} });
        let errors: { email?: string; password?: string } = {};
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
const connector = connect(mapStateToProps, { login });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(LoginForm);
