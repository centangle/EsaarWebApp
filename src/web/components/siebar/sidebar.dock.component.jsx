import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.styles.scss";
import profileIcon from "../../../assets/profile.png";
import homeIcon from "../../../assets/home.png";
import organizationIcon from "../../../assets/organization.png";
import giveIcon from "../../../assets/coin.png";
import takeIcon from "../../../assets/take.png";
import volunteerIcon from "../../../assets/volunteer.png";
import settingsIcon from "../../../assets/settings.png";
import graphIcon from "../../../assets/graph.png";
import plugIcon from "../../../assets/plug.png";
import activeBgIcon from "../../../assets/active-btn-bg.png";
import campaignIcon from "../../../assets/campaigns-alt.png";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
const DockSider = ({ roles }) => {
  let history = useHistory();
  return (
    <div className="page-left sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/" className="link-profile">
              <img className="profile" src={profileIcon} alt="Profile Icon" />
            </Link>
          </li>
          <li
            className={
              history.location.pathname === "/"
                ? "link-home active"
                : "link-home"
            }
          >
            <Link to="/">
              <img src={homeIcon} alt="Home Icon" />
            </Link>
          </li>
          <li
            className={
              history.location.pathname === "/organizations"
                ? "link-orgs active"
                : "link-orgs"
            }
          >
            <Link to="/organizations">
              <img src={organizationIcon} alt="Organization Icon" />
            </Link>
          </li>
          <li
            className={
              history.location.pathname === "/campaigns"
                ? "link-camp active"
                : "link-camp"
            }
          >
            <Link to="/campaigns">
              <img src={campaignIcon} alt="Camapaign Icon" />
            </Link>
          </li>
          <li
            className={
              history.location.pathname === "/requests"
                ? "link-org-req active"
                : "link-org-req"
            }
          >
            <Link to="/requests">
              <img src={giveIcon} alt="Give Icon" />
            </Link>
          </li>
          <li
            className={
              history.location.pathname === "/donation-requests"
                ? "link-dona active"
                : "link-dona"
            }
          >
            <Link to="/donation-requests">
              <img src={takeIcon} alt="Give Icon" />
            </Link>
          </li>
          <li
            className={
              history.location.pathname === "/volunteer"
                ? "link-volun active"
                : "link-volun"
            }
          >
            <Link to="/volunteers">
              <img src={volunteerIcon} alt="Give Icon" />
            </Link>
          </li>
          {roles === "Admin" ? (
            <li
              className={
                history.location.pathname === "/settings"
                  ? "link-sett active"
                  : "link-sett"
              }
            >
              <Link to="/settings">
                <img src={settingsIcon} alt="Give Icon" />
              </Link>
            </li>
          ) : null}

          <li
            className={
              history.location.pathname === "/graph"
                ? "link-report active"
                : "link-report"
            }
          >
            <Link to="/reports">
              <img src={graphIcon} alt="Give Icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
const mapState = (state) => {
  const { user } = state;
  return {
    roles: user.currentUser.roles,
  };
};
export default connect(mapState)(DockSider);
