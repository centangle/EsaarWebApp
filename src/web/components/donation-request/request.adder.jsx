import React, {useState} from "react";
import {connect} from "react-redux";
import {FormHolder} from "./request.styles";
import Modal from "../modal/modal.component";
const RequestAdder = ({dispatch, match, statuses, request, items, modal}) => {
  const [state, setState] = useState({
    Note: "",
    Status: "",
    modal: false,
    uom: "",
    StatusNote: "",
  });
  const handleClick = () => {
    dispatch({
      type: "ADD_REQUEST_THREAD_START",
      payload: {
        Entity: {
          Id: request.DonationRequestOrganization.Id,
        },
        EntityType: "Donation",
        Status: state.Status,
        Type: "General",
        // "Attachments": [
        //     {
        //         "Url": "string",
        //     },
        //     {
        //         "Url": "string",
        //     }
        // ],
        Note: state.Note,
      },
    });
  };
  const handleChange = (event) => {
    if (
      event.target.value === "Approved" ||
      event.target.value === "Collected" ||
      event.target.value === "Delivered" ||
      event.target.name === "StatusNote"
    ) {
      dispatch({type: "OPEN_MODAL", payload: {}});
    }
    setState({...state, [event.target.name]: event.target.value});
  };
  const handleClose = () => {
    dispatch({type: "CLOSE_MODAL", payload: {}});
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
  const handleApproveSubmit = () => {
    dispatch({
      type: "ADD_DONATION_APPROVAL_START",
      payload: {
        items,
        donationRequestOrganizationId: request.DonationRequestOrganization.Id,
        status: state.Status,
        note: state.StatusNote,
      },
    });
  };
  const {Note, Status} = state;
  return (
    <FormHolder>
      {modal ? (
        <Modal closeModal={handleClose}>
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
            <textarea
              name="StatusNote"
              value={state.StatusNote}
              onChange={handleChange}
              placeholder="Note"
            ></textarea>
            <button className="btn btn-success" onClick={handleApproveSubmit}>
              Save
            </button>
          </div>
        </Modal>
      ) : (
        false
      )}
      <select
        value={state.Status}
        name="Status"
        onChange={(event) => handleChange(event)}
      >
        {Object.keys(statuses).map((key) => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          );
        })}
      </select>
      <input
        className="reply"
        placeholder="Reply"
        type="text"
        onChange={handleChange}
        name="Note"
        value={Note}
      />
      <button className="submit" onClick={handleClick}>
        Add Replies
      </button>
    </FormHolder>
  );
};
const mapState = (state) => {
  const {request} = state;
  const {item} = state;
  return {
    statuses: request.status,
    items: item.items,
    modal: item.modal,
  };
};
export default connect(mapState)(RequestAdder);
