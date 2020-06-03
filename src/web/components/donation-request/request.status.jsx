import React from "react";
import { connect } from "react-redux";
const button = (r, dispatch) => {
  let process = (toBeStatus) => {
    if (
      toBeStatus === "Approved" ||
      toBeStatus === "Collected" ||
      toBeStatus === "Delivered" ||
      toBeStatus === "StatusNote"
    ) {
      dispatch({ type: "OPEN_MODAL", payload: { status: toBeStatus } });
    } else {
      let type = "Moderator";
      let organizationId = r.organizationId;
      let memberName = "";
      if (toBeStatus === "VolunteerAssigned") {
        type = "Volunteer";
        organizationId = r.DonationRequestOrganization.Organization.Id;
      }
      dispatch({
        type: "OPEN_REPLY_MODAL",
        payload: { status: toBeStatus, type, organizationId, memberName },
      });
    }
  };
  if (r.DonationRequestOrganization.Status !== r.NextStatus) {
    switch (r.NextStatus) {
      case "InProcess":
        return (
          <button onClick={() => process("InProcess")}>Process Now</button>
        );
      case "Approved":
        return <button onClick={() => process("Approved")}>Approve</button>;

      case "VolunteerAssigned":
        return (
          <button onClick={() => process("VolunteerAssigned")}>
            Assign Volunteer
          </button>
        );
      case "Collected":
        return <button onClick={() => process("Collected")}>Collect</button>;
      case "Delivered":
        return <button onClick={() => process("Delivered")}>Deliver</button>;
      case "Rejected":
        return <button onClick={() => process("Rejected")}>Reject</button>;
      default:
        return <span></span>;
    }
  } else {
    return <></>;
  }
};

const RequestStatus = ({ request, dispatch }) => {
  if (request) return button(request, dispatch);
  else return null;
};
export default connect()(RequestStatus);
