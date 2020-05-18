import React from "react";
import {CAMPAIGNSideHolder} from "./campaign.styles";
import {Link} from "react-router-dom";
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
const CampaignSidebar = ({campaign}) => {
  return (
    <CAMPAIGNSideHolder>
      <nav>
        <ul>
          <li>
            <Link to={`/campaigns/${campaign.Id}`}>
              <span>
                <img src={homeIcon} alt="" />
              </span>
              <span>Details</span>
              <span>تفصیلات</span>
            </Link>
          </li>
          {/* <li>
            <Link to={`/campaigns/${campaign.Id}/requests`}>
              <span>
                <img src={listAltIcon} alt="" />
              </span>
              <span>Requests</span>
              <span>درخواستیں</span>
            </Link>
          </li>
          <li>
            <Link to={`/campaigns/${campaign.Id}/packages`}>
              <span>
                <img src={listIcon} alt="" />
              </span>
              <span>Packages</span>
              <span>پیکیجز</span>
            </Link>
          </li> */}
          <li>
            <Link to={`/campaigns/${campaign.Id}/regions`}>
              <span>
                <img src={officesIcon} alt="" />
              </span>
              <span>Regions</span>
              <span>پیکیجز</span>
            </Link>
          </li>

          {/* <li>
            <Link to={`/campaigns/${campaign.Id}/tasks`}>
              <span>
                <img src={listIcon} alt="" />
              </span>
              <span>Tasks</span>
              <span>ٹاسک</span>
            </Link>
          </li>
          <li>
            <Link to={`/campaigns/${campaign.Id}/volunteers`}>
              <span>
                <img src={volunteerIcon} alt="" />
              </span>
              <span>Volunteers</span>
              <span>رضا کار</span>
            </Link>
          </li>
          <li>
            <Link to={`/campaigns/${campaign.Id}/modarators`}>
              <span>
                <img src={supportIcon} alt="" />
              </span>
              <span>Modarators</span>
              <span>مدارات</span>
            </Link>
          </li>
          <li>
            <Link to={`/campaigns/${campaign.Id}/members`}>
              <span>
                <img src={groupIcon} alt="" />
              </span>
              <span>Members</span>
              <span>ممبران</span>
            </Link>
          </li> */}
          <li>
            <Link to={`/campaigns/${campaign.Id}/stats`}>
              <span>
                <img src={moneyIcon} alt="" />
              </span>
              <span>Stats</span>
              <span>اعدادوشمار</span>
            </Link>
          </li>
          <li>
            <Link to={`/campaigns/${campaign.Id}/attachments`}>
              <span>
                <img src={attachIcon} alt="" />
              </span>
              <span>Attachments</span>
              <span>اٹیچمنٹ</span>
            </Link>
          </li>
          {/* <li>
            <Link to={`/campaigns/${campaign.Id}/owners`}>
              <span>
                <img src={accountIcon} alt="" />
              </span>
              <span>Owners</span>
              <span>مالکان</span>
            </Link>
          </li> */}

          <li>
            <Link to={`/campaigns/${campaign.Id}/items`}>
              <span>
                <img src={listAltIcon} alt="" />
              </span>
              <span>Items</span>
              <span>اشیاء</span>
            </Link>
          </li>
        </ul>
      </nav>
    </CAMPAIGNSideHolder>
  );
};
export default CampaignSidebar;
