import React from "react";
import {Row} from "./campaign.styles";
import {connect} from "react-redux";
import {baseUrl} from "../../../common/utility/request";
import noImage from "../../../assets/no-image.png";
const CampaignHome = ({
  campaign,
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
              <div key={cat.Name} className="CAMPAIGN-logo">
                {cat.Name}
              </div>
            );
          })}
        </Row>
      </div>
      <div>
        <h2>About Capmaign</h2>
        <div className="description">{campaign.Description}</div>
      </div>
      <div>
        <h2>Attachments</h2>
        <Row className="flex-wrap">
          {attachments &&
            attachments.map((attachment) => {
              return (
                <div key={attachment.Id} className="CAMPAIGN-logo">
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
          {campaigns && campaigns.map((campaign) => {
            return (
              <div key={campaign.Id} className="CAMPAIGN-logo">
                {campaign.Name}
              </div>
            );
          })}
        </Row>
      </div>
      {/* <div>
        <h2>Site Offices</h2>
        <Row className="flex-wrap">
          {offices.map((office) => {
            return (
              <div key={office.Id} className="CAMPAIGN-logo">
                {office.Name}
              </div>
            );
          })}
        </Row>
      </div> */}
    </div>
  );
};
const mapState = (state) => {
  const {campaign} = state;
  return {
    categories: campaign.categories,
    campaigns: campaign.campaigns?Object.keys(campaign.campaigns).map(key=>campaign.campaigns[key]):{},
    offices: campaign.offices,
    attachments: campaign.attachments,
  };
};
export default connect(mapState)(CampaignHome);
