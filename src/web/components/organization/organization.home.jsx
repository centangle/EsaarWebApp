import React from "react";
import {Row} from "./organization.styles";
import {connect} from "react-redux";
import {baseUrl} from "../../../common/utility/request";
import noImage from "../../../assets/no-image.png";
const OrganizationHome = ({
  organization,
  categories,
  campaigns,
  offices,
  attachments,
}) => {
  return (
    <div>
      <div>
        <h2>Categories</h2>
        <Row className="flex-wrap">
          {categories.map((cat) => {
            return (
              <div key={cat.Name} className="org-logo">
                {cat.Name}
              </div>
            );
          })}
        </Row>
      </div>
      <div>
        <h2>About Us</h2>
        <div className="description">{organization.Description}</div>
      </div>
      <div>
        <h2>Attachments</h2>
        <Row className="flex-wrap">
          {attachments &&
            attachments.map((attachment) => {
              return (
                <div key={attachment.Id} className="org-logo">
                  {attachment.Url?<img src={baseUrl + "/" + attachment.Url}
                   onError={(e) => {e.target.src = noImage; }}
                   alt="img" />:<img src={noImage} alt="img" />}
                </div>
              );
            })}
        </Row>
      </div>
      <div>
        <h2>Campaigns</h2>
        <Row className="flex-wrap">
          {campaigns.map((campaign) => {
            return (
              <div key={campaign.Id} className="org-logo">
                {campaign.Name}
              </div>
            );
          })}
        </Row>
      </div>
      <div>
        <h2>Site Offices</h2>
        <Row className="flex-wrap">
          {offices.map((office) => {
            return (
              <div key={office.Id} className="org-logo">
                {office.Name}
              </div>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
const mapState = (state) => {
  const {organization} = state;
  return {
    categories: organization.categories,
    campaigns: organization.campaigns,
    offices: organization.offices,
    attachments: organization.attachments,
  };
};
export default connect(mapState)(OrganizationHome);
