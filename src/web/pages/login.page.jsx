import React, {useState} from "react";
import {connect} from "react-redux";
import logo from "../../assets/logo.png";
import volunteerImage from "../../assets/volunteer-image.png";
import background1920 from "../../assets/images/bg-2.jpg";
import background1366 from "../../assets/images/bg-2.jpg";
import "./LoginPage.scss";
import {userTypes} from "../../common/redux/user/user.types";
import {
  emailSignInStart,
  signUpStart,
} from "../../common/redux/user/user.actions";
import {Link} from "react-router-dom";

const LoginPage = ({dispatch, emailSignInStart, signUpStart}) => {
  const INITIAL_STATE = {
    email: "",
    mobile: "",
    name: "",
    password: "",
    name: "",
    isLogin: true,
  };
  const [state, setState] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  };
  const handleRegSubmit = (event) => {
    event.preventDefault();
    const {email, password, mobile, name} = state;
    signUpStart({
      Email: email,
      Password: password,
      ConfirmPassword: password,
      MobileNo: mobile,
      Name: name,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = state;
    emailSignInStart({
      username: email,
      password: password,
      grant_type: "password",
    });
  };
  return (
    <div className="landing-page">
      <div className="login-wrapper">
        <div className="lw-section">
          <form
            className={
              "guest-button-wrapper " + (!state.isLogin ? "hidden" : "")
            }
            onSubmit={handleSubmit}
          >
            <img src={logo} alt="logo" className="landing-page-logo" />
            <div className="form-field">
              <label>Username / Email Address</label>
              <input
                onChange={(event) => handleChange(event)}
                name="email"
                type="email"
                placeholder=""
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                onChange={(event) => handleChange(event)}
                name="password"
                type="password"
                placeholder=""
              />
            </div>
            <button type="submit" className="signin-button guest-button">
              &nbsp;Sign In
            </button>
            <p
              className="change-mode"
              onClick={() => setState({...state, isLogin: false})}
            >
              Don't have an account?
            </p>
          </form>
          <form
            className={
              "guest-button-wrapper " + (state.isLogin ? "hidden" : "")
            }
            onSubmit={handleRegSubmit}
          >
            <img src={logo} alt="logo" className="landing-page-logo" />
            <div className="form-field">
              <label>Full Name</label>
              <input
                onChange={(event) => handleChange(event)}
                type="text"
                name="name"
              />
            </div>
            <div className="form-field">
              <label>Mobile</label>
              <input
                onChange={(event) => handleChange(event)}
                type="text"
                name="mobile"
                placeholder=""
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                onChange={(event) => handleChange(event)}
                type="email"
                name="email"
                placeholder=""
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                onChange={(event) => handleChange(event)}
                type="password"
                name="password"
                placeholder=""
              />
            </div>
            <button type="submit" className="signin-button guest-button">
              &nbsp;Create Account
            </button>
            <p
              className="change-mode"
              onClick={() => setState({...state, isLogin: true})}
            >
              Already have an account?
            </p>
          </form>

          <div className="login-media">
            <div className="lm-image-wrapper">
              <img src={volunteerImage} alt="volunteer" />
            </div>
            <p>
              Those who spend of their goods (in charity) by night and by day in
              secret and in public shall have their reward with the Lord: on
              them shall be no fear nor shall they grieve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (emailAndPassword) =>
    dispatch(emailSignInStart(emailAndPassword)),
  signUpStart: (emailAndPassword) => dispatch(signUpStart(emailAndPassword)),
});
export default connect(null, mapDispatchToProps)(LoginPage);
