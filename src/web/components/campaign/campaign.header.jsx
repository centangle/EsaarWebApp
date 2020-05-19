import React, { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import Dropdown from "../dropdown/dropdown.component";
import {
  Row,
  FormHolder,
} from "./campaign.styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../../common/utility/request";
import Modal from "../modal/modal.component";
import RegionSelector from "../region/region.selector";
import noImage from "../../../assets/no-image.png";
import CampaignAdder from "./campaign.adder";
const CampaignHeader = ({ campaign, dispatch, regions, form }) => {
  const [state, setState] = useState({
    modal: false,
    type: "Member",
  });
  let history = useHistory();
  const handleJoin = (type, regions = []) => {
    const data = {
      Campaign: {
        Id: campaign.Id,
      },
      Regions: regions,
      EntityType: "Member",
      Type: type,
    };
    dispatch({ type: "REQUEST_START", payload: data });
    //['Owner', 'Member', 'Volunteer', 'Moderator', 'Item', 'Region']
  };

  const hangleGo = (slug) => {
    history.push("/campaigns/" + campaign.Id + "/" + slug);
  };
  const openModal = (type) => {
    setState({
      ...state,
      modal: true,
      type,
    });
  };
  const closeModal = () => {
    setState({
      ...state,
      modal: false,
    });
  };

  const handleChange = (e) => {
    if (e.value === "Volunteer" || e.value === "Moderator") {
      openModal(e.value);
    } else if (e.value === 'Edit') {
      dispatch({ type: 'OPEN_MODAL', payload: 'CAMPAIGN' });
    } else {
      handleJoin(e.value);
    }
  };

  const handleSubmit = (e) => {
    handleJoin(
      state.type,
      Object.keys(regions).map((key) => {
        return {
          RegionLevel: regions[key].RegionLevel,
          Region: {
            Id: regions[key][regions[key].RegionLevel].Id,
          },
        };
      })
    );
  };
  const closeEditModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "CAMPAIGN" });
  };
  return (
    <Row>
      {form.campaignModal ? (
        <Modal closeModal={closeEditModal}>
          <CampaignAdder current={campaign} />
        </Modal>
      ) : null}
      <div className="campaign-logo">
        {campaign.ImageUrl ? <img src={baseUrl + campaign.ImageUrl} alt="logo" /> : <img src={noImage} alt="logo" />}
      </div>
      {state.modal ? (
        <Modal closeModal={closeModal}>
          <FormHolder>
            <div>
              <div className="input-holder">
                <RegionSelector
                  isCampaignRegion
                  campaignId={campaign.Id}
                />
                <button
                  className="btn btn-success"
                  onClick={(event) => handleSubmit()}
                >
                  Save
                </button>
              </div>
            </div>
          </FormHolder>
        </Modal>
      ) : null}
      <div className="CAMPAIGN-actions">
        <h1>{campaign.Name}</h1>
        <div className="CAMPAIGN-buttons">
          <CustomButton handleClick={() => hangleGo("donate")}>
            Donate
          </CustomButton>
          <CustomButton handleClick={() => hangleGo("get-donation")}>
            Request
          </CustomButton>
          <Dropdown
            className="icon-drop-round"
            options={[
              { value: "Moderator", content: "Request Moderation" },
              { value: "Edit", content: "Edit Campaign" },
            ]}
            onChange={(e) => handleChange(e)}
            buttonIndicator={true}
            //buttonIndicatorContent={''}
            resetValue={""}
            selectedOption={"expense"}
          //PreBuildOptions={ColorPicker}
          />
        </div>
      </div>
    </Row>
  );
};
const mapState = (state) => {
  const { region } = state;
  const { campaign } = state;
  return {
    regions: region.regions,
    form: campaign.form
  };
};
export default connect(mapState)(CampaignHeader);
