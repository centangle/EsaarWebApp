import React, { useState, useEffect } from "react";
import { OrgSideHolder } from "./organization.styles";
import { Link } from "react-router-dom";
import homeIcon from "../../../assets/home-side.png";
import officesIcon from "../../../assets/offices.png";
import listAltIcon from "../../../assets/list-alt.png";
import emailIcon from "../../../assets/email.png";
import accountIcon from "../../../assets/account.png";
import attachIcon from "../../../assets/attach.png";
import moneyIcon from "../../../assets/money.png";
import groupIcon from "../../../assets/group.png";
import supportIcon from "../../../assets/support.png";
import volunteerIcon from "../../../assets/volunteer-alt.png";
import listIcon from "../../../assets/list.png";
import campaignIcon from '../../../assets/campaigns.png';
import { connect } from "react-redux";
import {canView} from "../../../common/utility/request";
const OrganizationSidebar = ({ organization, CurrentMemberRoles }) => {
  return (
    <OrgSideHolder>
      <nav>
        <ul>
          <li>
            <Link to={`/organizations/${organization.Id}`}>
              <span>
                <img src={homeIcon} alt="" />
              </span>
              <span>Details</span>
              <span>تفصیلات</span>
            </Link>
          </li>
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/requests`}>
                  <span>
                    <img src={listAltIcon} alt="" />
                  </span>
                  <span>Requests</span>
                  <span>درخواستیں</span>
                </Link>
              </li> : null
          }
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/packages`}>
                  <span>
                    <img src={listIcon} alt="" />
                  </span>
                  <span>Packages</span>
                  <span>پیکیجز</span>
                </Link>
              </li> : null
          }
          <li>
            <Link to={`/organizations/${organization.Id}/regions`}>
              <span>
                <img src={officesIcon} alt="" />
              </span>
              <span>Regions</span>
              <span>پیکیجز</span>
            </Link>
          </li>
          <li>
            <Link to={`/organizations/${organization.Id}/campaigns`}>
              <span>
                <img src={campaignIcon} alt="" />
              </span>
              <span>Campaigns</span>
              <span>مہمات</span>
            </Link>
          </li>
          {
            canView(["Owner", "Volunteer", "Moderator"], CurrentMemberRoles) ? <li>
              <Link to={`/organizations/${organization.Id}/tasks`}>
                <span>
                  <img src={listIcon} alt="" />
                </span>
                <span>Tasks</span>
                <span>ٹاسک</span>
              </Link>
            </li> : null
          }
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/volunteers`}>
                  <span>
                    <img src={volunteerIcon} alt="" />
                  </span>
                  <span>Volunteers</span>
                  <span>رضا کار</span>
                </Link>
              </li> : null
          }
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/modarators`}>
                  <span>
                    <img src={supportIcon} alt="" />
                  </span>
                  <span>Modarators</span>
                  <span>مدارات</span>
                </Link>
              </li> : null
          }
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/members`}>
                  <span>
                    <img src={groupIcon} alt="" />
                  </span>
                  <span>Members</span>
                  <span>ممبران</span>
                </Link>
              </li> : null
          }
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/stats`}>
                  <span>
                    <img src={moneyIcon} alt="" />
                  </span>
                  <span>Stats</span>
                  <span>اعدادوشمار</span>
                </Link>
              </li> : null
          }
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/attachments`}>
                  <span>
                    <img src={attachIcon} alt="" />
                  </span>
                  <span>Attachments</span>
                  <span>اٹیچمنٹ</span>
                </Link>
              </li> : null
          }
          {
            canView(["Owner", "Moderator"], CurrentMemberRoles) ?
              <li>
                <Link to={`/organizations/${organization.Id}/owners`}>
                  <span>
                    <img src={accountIcon} alt="" />
                  </span>
                  <span>Owners</span>
                  <span>مالکان</span>
                </Link>
              </li> : null
          }
          <li>
            <Link to={`/organizations/${organization.Id}/offices`}>
              <span>
                <img src={officesIcon} alt="" />
              </span>
              <span>Site Offices</span>
              <span>دفاتر</span>
            </Link>
          </li>
          <li>
            <Link to={`/organizations/${organization.Id}/accounts`}>
              <span>
                <img src={officesIcon} alt="" />
              </span>
              <span>Account Numbers</span>
              <span>دفاتر</span>
            </Link>
          </li>
          <li>
            <Link to={`/organizations/${organization.Id}/items`}>
              <span>
                <img src={listAltIcon} alt="" />
              </span>
              <span>Items</span>
              <span>اشیاء</span>
            </Link>
          </li>
        </ul>
      </nav>
    </OrgSideHolder>
  );
};
const mapState = (state) => {

  const { organization } = state;
  const { current } = organization;
  return {
    CurrentMemberRoles: current.CurrentMemberRoles
  }
}
export default connect(mapState)(OrganizationSidebar);
