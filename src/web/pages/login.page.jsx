import React, { useState } from "react";
import { connect } from "react-redux";
import logo from "../../assets/logo.png";
import volunteerImage from "../../assets/volunteer-image.png";
import background1920 from "../../assets/images/bg-2.jpg";
import background1366 from "../../assets/images/bg-2.jpg";
import Spinner from '../components/spinner/spinner.component';
import "./LoginPage.scss";
import { userTypes } from "../../common/redux/user/user.types";
import {
  emailSignInStart,
  signUpStart,
} from "../../common/redux/user/user.actions";
import { Link } from "react-router-dom";

const LoginPage = ({ dispatch, emailSignInStart,isLogin, signUpStart, isSigningIn, isSigningUp }) => {
  const INITIAL_STATE = {
    email: "",
    mobile: "",
    name: "",
    password: "",
    name: "",
  };
  const [state, setState] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleRegSubmit = (event) => {
    event.preventDefault();
    const { email, password, mobile, name } = state;
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
    const { email, password } = state;
    emailSignInStart({
      username: email,
      password: password,
      grant_type: "password",
    });
  };
  const login = () =>{
    dispatch({type:'LOGIN'});
  }
  const signup = () =>{
    dispatch({type:'SIGNUP'})
  }
  return (
    <div className="landing-page">
      <div className="login-wrapper">
        <div className="lw-section">
          {
            isSigningIn ? <Spinner /> : <form
              className={
                "guest-button-wrapper " + (!isLogin ? "hidden" : "")
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
                onClick={() => signup()}
              >
                Don't have an account?
            </p>
            </form>
          }
          {
            isSigningUp?<Spinner />:<form
            className={
              "guest-button-wrapper " + (isLogin ? "hidden" : "")
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
              onClick={() => login()}
            >
              Already have an account?
            </p>
          </form>
          }

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
const mapState = (state) => {
  const { user } = state;
  return {
    isSigningIn: user.isSigningIn,
    isSigningUp: user.isSigningUp,
    isLogin:user.isLogin
  }
}
const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (emailAndPassword) =>
  dispatch(emailSignInStart(emailAndPassword)),
  signUpStart: (emailAndPassword) => dispatch(signUpStart(emailAndPassword)),
  dispatch
});
export default connect(mapState, mapDispatchToProps)(LoginPage);
