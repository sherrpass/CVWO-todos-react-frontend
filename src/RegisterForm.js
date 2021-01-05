import React, { useState } from "react";
import validator from "validator";
const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirmed: "",
        errors: {},
    });
    const { email, password, passwordConfirmed, errors } = formData;
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
        } else if (password.length < 8) {
            errors.password = "Password must contain at least 8 characters.";
        }
        if (password !== passwordConfirmed) {
            errors.passwordConfirmed = "Passwords must match.";
        }
        if (Object.values(errors).length === 0) {
            //register the user
        } else {
            setFormData({ ...formData, errors });
        }
    };

    return (
        <div>
            <form novalidate onSubmit={onSubmit}>
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
                    <div class="invalid-feedback">{errors.email}</div>
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
                    <div class="invalid-feedback">{errors.password}</div>
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
                    />
                    <div class="invalid-feedback">
                        {errors.passwordConfirmed}
                    </div>
                </div>

                <button type="submit" className="margin-top-med btn-primary">
                    Register
                </button>
                <div className="margin-top-sm text-muted font-sm">
                    Already have an account? <a href="#">Login</a>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
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
