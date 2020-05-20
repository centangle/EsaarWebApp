import React, { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import Dropdown from "../dropdown/dropdown.component";
import {
  Row,
  FormHolder,
} from "./organization.styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../../common/utility/request";
import Modal from "../modal/modal.component";
import RegionSelector from "../region/region.selector";
import noImage from "../../../assets/no-image.png";
import OrganizationAdder from "./organization.adder";
const OrganizationHeader = ({ organization, dispatch, regions, form }) => {
  const [state, setState] = useState({
    modal: false,
    type: "Member",
  });
  let history = useHistory();
  const handleJoin = (type, regions = []) => {
    const data = {
      Organization: {
        Id: organization.Id,
      },
      Regions: regions,
      EntityType: "Member",
      Type: type,
    };
    dispatch({ type: "REQUEST_START", payload: data });
    //['Owner', 'Member', 'Volunteer', 'Moderator', 'Item', 'Region']
  };

  const hangleGo = (slug) => {
    history.push("/organizations/" + organization.Id + "/" + slug);
  };
  const openModal = (type) => {
    dispatch({ type: 'OPEN_MODAL', payload: 'VOLUNTEER' });
    setState({
      ...state,
      modal: true,
      type,
    });
  };
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    setState({
      ...state,
      modal: false,
    });
  };

  const handleChange = (e) => {
    if (e.value === "Volunteer" || e.value === "Moderator") {
      openModal(e.value);
    } else if (e.value === 'Edit') {
      dispatch({ type: 'OPEN_MODAL', payload: 'ORG' });
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
    dispatch({ type: "CLOSE_MODAL", payload: "ORG" });
  };
  return (
    <Row>
      {form.orgModal ? (
        <Modal closeModal={closeEditModal}>
          <OrganizationAdder current={organization} />
        </Modal>
      ) : null}
      <div className="org-logo">
        {organization.ImageUrl ? <img src={baseUrl + organization.ImageUrl} alt="logo" /> : <img src={noImage} alt="logo" />}
      </div>
      {form.volunteerModal ? (
        <Modal closeModal={closeModal}>
          <FormHolder>
            <div>
              <div className="input-holder">
                <RegionSelector
                  isOrganizationRegion
                  organizationId={organization.Id}
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
      <div className="org-actions">
        <h1>{organization.Name}</h1>
        <div className="org-buttons">
          <CustomButton handleClick={() => handleJoin("Member")}>
            Member
          </CustomButton>
          <CustomButton handleClick={() => hangleGo("donate")}>
            Donate
          </CustomButton>
          <CustomButton handleClick={() => hangleGo("get-donation")}>
            Request
          </CustomButton>
          <Dropdown
            className="icon-drop-round"
            options={[
              { value: "Volunteer", content: "Join as Volunteer" },
              { value: "Moderator", content: "Request Moderation" },
              { value: "Edit", content: "Edit Organization" },
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
  const { organization } = state;
  return {
    regions: region.regions,
    form: organization.form
  };
};
export default connect(mapState)(OrganizationHeader);
