import React, {useState} from "react";
import CustomButton from "../custom-button/custom-button.component";
import Dropdown from "../dropdown/dropdown.component";
import {
  White70,
  White30,
  FlexFull,
  ActionRow,
  ListItems,
  Row,
  FormHolder,
} from "./organization.styles";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {baseUrl} from "../../../common/utility/request";
import Modal from "../modal/modal.component";
import RegionSelector from "../region/region.selector";
const OrganizationHeader = ({organization, dispatch, regions}) => {
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
    dispatch({type: "REQUEST_START", payload: data});
    //['Owner', 'Member', 'Volunteer', 'Moderator', 'Item', 'Region']
  };

  const hangleGo = (slug) => {
    history.push("/organizations/" + organization.Id + "/" + slug);
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
  return (
    <Row>
      <div className="org-logo">
        <img src={baseUrl + "/" + organization.ImageUrl} alt="logo" />
      </div>
      {state.modal ? (
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
              {value: "Volunteer", content: "Join as Volunteer"},
              {value: "Moderator", content: "Request Moderation"},
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
  const {region} = state;
  return {
    regions: region.regions,
  };
};
export default connect(mapState)(OrganizationHeader);
