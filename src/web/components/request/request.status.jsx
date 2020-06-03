import React from "react";
import { connect } from "react-redux";
const button = (request, dispatch) => {
  console.log(request);
  let process = (toBeStatus) => {
    let type = "";
    let organizationId = request.Organization.Id;
    let memberName = "";
    if (toBeStatus === "ModeratorAssigned") {
      type = "Moderator";
    }
    dispatch({
      type: "OPEN_REPLY_MODAL_REQUEST",
      payload: { status: toBeStatus, type, organizationId, memberName },
    });
  };
  if (request.Status !== request.NextStatus) {
    switch (request.NextStatus) {
      case "InProcess":
        return (
          <button onClick={() => process("InProcess")}>Process Now</button>
        );
      case "Approved":
        return <button onClick={() => process("Approved")}>Approve</button>;
      case "ModeratorAssigned":
        return (
          <button onClick={() => process("ModeratorAssigned")}>
            Assign Moderator
          </button>
        );
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
