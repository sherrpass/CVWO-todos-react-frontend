import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";

const Login = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div className="register__dashboard">
                <div className="register__container">
                    <div className="register__title">
                        <span className="heading-primary">Login</span>
                    </div>
                    <div className="register__form">
                        <LoginForm />
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
export default connect(mapStateToProps)(Login);

// const Login = ({ isAuthenticated, login }) => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const { email, password } = formData;
//     const onChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     const onSubmit = (e) => {
//         e.preventDefault();
//         console.log({ email, password });
//         login({ email, password });
//     };

//     if (isAuthenticated) {
//         return <Redirect to="/" />;
//     }
//     return (
//         <div>
//             <h1>Login</h1>
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
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// const mapStateToProps = (state) => ({
//     //toredirect logged in users to the dashboard
//     isAuthenticated: state.auth.isAuthenticated,
// });
// export default connect(mapStateToProps, { login })(Login);
