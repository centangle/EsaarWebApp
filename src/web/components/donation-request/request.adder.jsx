import React, { useState } from "react";
import { connect } from "react-redux";
import { FormHolder } from "./request.styles";
import UploaderComponent from "../uploader/uploader.component";
import Select from "react-select";
const baseUrl = require("../../../common/utility/request").baseUrl;
const RequestAdder = ({
  status,
  files,
  dispatch,
  match,
  statuses,
  request,
  items,
  modal,
  NextStatus,
  volunteers,
  moderators,
  type,
}) => {
  const [state, setState] = useState({
    Note: "",
    Status: status,
    modal: false,
    uom: "",
    StatusNote: "",
    VolunteerAssigned: "",
  });

  const handleChange = (event) => {
    if (
      event.target.value === "Approved" ||
      event.target.value === "Collected" ||
      event.target.value === "Delivered" ||
      event.target.name === "StatusNote"
    ) {
      dispatch({ type: "OPEN_MODAL", payload: {} });
    }
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL", payload: {} });
  };
  const handleDrop = (e, item) => {
    if (state.Status === "Delivered") {
      dispatch({
        type: "DONATION_UOM_CHANGED",
        payload: {
          DeliveredQuantityUOM: e.target.value,
          item,
          type: "DeliveredQuantityUOM",
        },
      });
    } else if (state.Status === "Collected") {
      dispatch({
        type: "DONATION_UOM_CHANGED",
        payload: {
          CollectedQuantityUOM: e.target.value,
          item,
          type: "CollectedQuantityUOM",
        },
      });
    } else {
      dispatch({
        type: "DONATION_UOM_CHANGED",
        payload: {
          ApprovedQuantityUOM: e.target.value,
          item,
          type: "ApprovedQuantityUOM",
        },
      });
    }
  };
  const handleQuantityChange = (e, item) => {
    if (state.Status === "Delivered") {
      dispatch({
        type: "DONATION_QUANTITY_CHANGED",
        payload: {
          DeliveredQuantity: e.target.value,
          item,
          type: "DeliveredQuantity",
        },
      });
    } else if (state.Status === "Collected") {
      dispatch({
        type: "DONATION_QUANTITY_CHANGED",
        payload: {
          CollectedQuantity: e.target.value,
          item,
          type: "CollectedQuantity",
        },
      });
    } else {
      dispatch({
        type: "DONATION_QUANTITY_CHANGED",
        payload: {
          ApprovedQuantity: e.target.value,
          item,
          type: "ApprovedQuantity",
        },
      });
    }
  };
  const handleSubmit = () => {
    const currentStatus = request.DonationRequestOrganization.Status;
    dispatch({
      type: "ADD_DONATION_REQUEST_START",
      payload: {
        items,
        donationRequestOrganizationId: request.DonationRequestOrganization.Id,
        status: state.Status === currentStatus ? null : state.Status,
        note: state.Note,
        Attachments: files.map((file) => {
          return { Url: file.file };
        }),
        Moderator: {
          Id: state.ModeratorAssigned,
        },
        Volunteer: {
          Id: state.VolunteerAssigned,
        },
      },
    });
  };
  const { Note, Status } = state;
  const handleSelectMember = ({ value, label, name }) => {
    setState({ ...state, [name]: { value, label } });
  };
  const mappedVolunteers = volunteers.map((item) => {
    return { value: item.Member.Id, label: item.Member.Name };
  });
  const mappedModerators = moderators.map((item) => {
    return { value: item.Member.Id, label: item.Member.Name };
  });
  return (
    <FormHolder>
      <span>{status}</span>
      {type && NextStatus === "VolunteerAssigned" ? (
        <Select
          className="dropdown"
          value={state.VolunteerAssigned}
          onChange={(item) =>
            handleSelectMember({ ...item, name: "VolunteerAssigned" })
          }
          placeholder={"Select Volunteer"}
          options={mappedVolunteers}
        />
      ) : null}
      {type && NextStatus === "ModeratorAssigned" ? (
        <Select
          className="dropdown"
          value={state.ModeratorAssigned}
          onChange={(item) =>
            handleSelectMember({ ...item, name: "ModeratorAssigned" })
          }
          placeholder={"Select Moderator"}
          options={mappedModerators}
        />
      ) : null}
      <input
        className="reply"
        placeholder="Reply"
        type="text"
        onChange={handleChange}
        name="Note"
        value={Note}
      />

      {modal ? (
        <React.Fragment>
          <h1>Modify Request {state.Status}</h1>
          <div className="item-adjust">
            <div className="item">
              <span></span>
              <span className="r">Quantity</span>
              <span className="u">Unit</span>
            </div>
            {items.map((item) => {
              let Quantity = item.ApprovedQuantity;
              let QuantityUOMId = item.ApprovedQuantityUOM.Id;
              let readonly = false;
              if (state.Status === "Delivered") {
                Quantity = item.DeliveredQuantity;
                QuantityUOMId = item.DeliveredQuantityUOM.Id;
              }
              if (state.Status === "Collected") {
                Quantity = item.CollectedQuantity;
                QuantityUOMId = item.CollectedQuantityUOM.Id;
              }
              return (
                <div className="item" key={item.Item.Id}>
                  <span>{item.Item.Name}</span>
                  <input
                    className="r"
                    value={Quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                    type="text"
                    name="Quantity"
                  />
                  <select
                    className="u"
                    value={QuantityUOMId}
                    onChange={(e) => handleDrop(e, item)}
                  >
                    <option value={0} disabled>
                      Select Qty
                    </option>
                    {item.ItemUOMs.map((uom) => {
                      return (
                        <option key={uom.Id} value={uom.Id}>
                          {uom.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : null}
      <div className="attachment-holder">
        <UploaderComponent title="Upload Photos" />
        <div className="files-holder">
          {files.map((f) => {
            return (
              <div key={f.file} className="inline-tr">
                <img src={baseUrl + "/" + f.file} alt="File" />
                <input
                  name={`naam-${f.file}`}
                  type="text"
                  onChange={(e) => handleChange(e, f)}
                  placeholder="Name"
                />
              </div>
            );
          })}
        </div>
      </div>

      <button className="submit" onClick={handleSubmit}>
        Add Replies
      </button>
    </FormHolder>
  );
};
const mapState = (state) => {
  const { request, upload, donation, organization } = state;
  const { item } = state;
  return {
    files: upload.files,
    statuses: request.status,
    items: item.items,
    modal: item.modal,
    replyModal: donation.replyModal,
    status: donation.currentStatus,
    NextStatus: donation.current.NextStatus,
    volunteers: organization.volunteersForDD,
    moderators: organization.moderatorsForDD,
    type: donation.type,
  };
};
export default connect(mapState)(RequestAdder);
