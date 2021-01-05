import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RegisterForm from "./RegisterForm";

const Register = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div className="register__dashboard">
                <div className="register__container">
                    <div className="register__title">
                        <span className="heading-primary">Sign Up</span>
                    </div>
                    <div className="register__form">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    //toredirect logged in users to the dashboard
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Register);

// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { register } from "../../actions/auth";

// const Register = ({ isAuthenticated, register, history }) => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         passwordConfirmed: "",
//         error: null,
//     });
//     const { email, password, passwordConfirmed } = formData;
//     const onChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     const onSubmit = (e) => {
//         e.preventDefault();
//         if (password !== passwordConfirmed) {
//             console.log("Passwords need to match");
//             //error message alert
//         } else {
//             register({ email, password });
//         }
//     };

//     if (isAuthenticated) {
//         return <Redirect to="/" />;
//     }
//     return (
//         <div>
//             <h1>Register</h1>

//             <form onSubmit={onSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email Address"
//                     name="email"
//                     value={email}
//                     onChange={onChange}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     value={password}
//                     onChange={onChange}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Type your password again"
//                     name="passwordConfirmed"
//                     value={passwordConfirmed}
//                     onChange={onChange}
//                 />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// const mapStateToProps = (state) => ({
//     //toredirect logged in users to the dashboard
//     isAuthenticated: state.auth.isAuthenticated,
// });
// export default connect(mapStateToProps, { register })(Register);
