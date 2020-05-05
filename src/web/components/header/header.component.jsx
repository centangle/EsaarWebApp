import React, {useState, useLayoutEffect} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {Link} from "react-router-dom";
import "./header.styles.scss";
import drawerIcon from "../../../assets/drawer.png";
import logoIcon from "../../../assets/logo.png";
import notificationIcon from "../../../assets/notification.png";
import searchIcon from "../../../assets/search.png";
const Nav = styled.nav`
  display: flex;
  z-index: 10;
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  background: #fff;
  width: 100%;
  align-items: center;
  a {
    padding: 10px;
    text-decoration: none;
  }
`;
const Header = () => {
  const [state, setState] = useState({
    sider: false,
    position: "absolute",
    top: "auto",
  });
  useLayoutEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY >= 70) {
        setState({...state, position: "fixed", top: "0"});
      } else {
        setState({...state, position: "absolute", top: "auto"});
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header>
      <Nav position={state.position} top={state.top}>
        <img className="drawer" src={drawerIcon} alt="Drawer" />
        <Link to="/">
          <img className="logo" src={logoIcon} alt="Esaar Logo" />
        </Link>
        <div className="center">
          <div className="search">
            <img className="search" src={searchIcon} alt="Esaar Search" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="right">
          <img className="notification" src={notificationIcon} alt="Drawer" />
          <span className="count">21</span>
        </div>
      </Nav>
    </header>
  );
};

export default connect()(Header);
