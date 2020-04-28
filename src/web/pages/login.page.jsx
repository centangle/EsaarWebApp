import React, { useState } from "react";
import { connect } from "react-redux";
import kanbanLogo from "../../assets/images/logo.svg";
import background1920 from "../../assets/images/bg-2.jpg";
import background1366 from "../../assets/images/bg-2.jpg";
import "./LoginPage.scss";
import {userTypes} from '../../common/redux/user/user.types';
import { emailSignInStart,signUpStart } from '../../common/redux/user/user.actions';
import { Link } from "react-router-dom";

const LoginPage = ({ dispatch, emailSignInStart,signUpStart }) => {
  const INITIAL_STATE = {
    email: "",
    mobile:"",
    name:"",
    password: "",
    name:""
  }
  const [state, setState] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const handleRegSubmit = (event)=>{
    event.preventDefault();
    const {email,password,mobile,name} = state;
    signUpStart({Email:email,Password:password,ConfirmPassword:password,MobileNo:mobile,Name:name});
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const {email,password} = state;
    emailSignInStart({username:email,password:password,grant_type:"password"});
  }
  return (
    <div className="landing-page">
      <div className="landing-page-background">
        <img
          srcSet={`${background1920} 1920w, ${background1366} 1366w`}
          src={background1920}
          alt="background"
        />
      </div>
      <div className="landing-page-info-wrapper">
        <div className="landing-page-info">
          <div className="landing-page-heading">
            <img
              src={kanbanLogo}
              alt="logo"
              className="landing-page-logo"
            />
            &nbsp;
            <h1>Charity</h1>
          </div>
          <p className="landing-page-description">
            Sharing is Caring.
          </p>
          <form className="guest-button-wrapper" onSubmit={handleSubmit}>
            <input onChange={(event) => handleChange(event)} name="email" type="email" placeholder="username" />
            <input onChange={(event) => handleChange(event)} name="password" type="password" placeholder="password" />
            <button type="submit" className="signin-button guest-button">
               &nbsp;Sign In
              </button>
          </form>
        </div>
        <div className="landing-page-info">
          <div className="landing-page-heading">
            <h1>Signup</h1>
          </div>
          <form className="guest-button-wrapper" onSubmit={handleRegSubmit}>
            <input onChange={(event) => handleChange(event)} type="text" name="name" placeholder="Display name" />
            <input onChange={(event) => handleChange(event)} type="text" name="mobile" placeholder="Mobile" />
            <input onChange={(event) => handleChange(event)} type="email" name="email" placeholder="email" />
            <input onChange={(event) => handleChange(event)} type="password" name="password" placeholder="password" />
            <button type="submit" className="signin-button guest-button">
               &nbsp;Create Account
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword)),
  signUpStart:(emailAndPassword) => dispatch(signUpStart(emailAndPassword)),
});
export default connect(null, mapDispatchToProps)(LoginPage);