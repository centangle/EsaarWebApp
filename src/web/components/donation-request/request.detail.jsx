import React, {useState, useEffect} from "react";
import {VerticalTimeline, VerticalTimelineElement} from "../timeline";
import {ThreadHeader} from "./request.styles";
import RequestAdder from "./request.adder";
import {connect} from "react-redux";
import moment from "moment";
import RegionSelector from "../region/region.selector";
import {
  fetchDonationDetailsStart,
  fetchDonationRequestThreadStart,
  fetchDonationItemsStart,
} from "../../../common/redux/donation/donation.actions";
import Modal from "../modal/modal.component";
const RequestDetail = ({
  match,
  replies,
  request,
  dispatch,
  regions,
  fetchDonationItemsStart,
  fetchDonationDetailsStart,
  fetchDonationRequestThreadStart,
}) => {
  useEffect(() => {
    fetchDonationDetailsStart(match.params.id);
    fetchDonationRequestThreadStart(match.params.id);
    fetchDonationItemsStart(match.params.id);
  }, [
    fetchDonationDetailsStart,
    fetchDonationRequestThreadStart,
    fetchDonationItemsStart,
    match.params.id,
  ]);
  const [state, setState] = useState({modal: false});
  const TimelineIcon = ({title}) => {
    return <span className="customIcon">{title}</span>;
  };
  const openModal = () => {
    setState({...state, modal: true});
  };
  const closeModal = () => {
    setState({...state, modal: false});
  };
  const handleSubmit = () => {
    const payloadRegions = Object.keys(regions).map((key) => {
      return {
        RegionLevel: regions[key].RegionLevel,
        RequestId: request.Id,
        Id: key,
        Region: {
          Id: regions[key][regions[key].RegionLevel].Id,
        },
      };
    });
    dispatch({
      type: "MODIFY_REQUEST_REGIONS",
      payload: {
        Organization: {
          Id: request.Organization.Id,
        },
        Type: request.Type,
        EntityType: request.EntityType,
        Regions: payloadRegions,
      },
    });
  };
  return (
    <div className="page-right">
      <ThreadHeader>
        <h2 className="tread-title">Request Thread</h2>
        {request && request.CanUpdateRegions ? (
          <span className="tread-actions">
            <button className="btn btn-primary" onClick={openModal}>
              Update Regions
            </button>
          </span>
        ) : null}
        {state.modal ? (
          <Modal closeModal={closeModal}>
            <RegionSelector />
            <button className="btn btn-success" onClick={handleSubmit}>
              Save Regions
            </button>
          </Modal>
        ) : null}
        <span className="tread-topic">
          {request
            ? request.Member.Name +
              " has requested to " +
              request.Type +
              ". The current status is " +
              request.DonationRequestOrganization.Status
            : null}
        </span>
      </ThreadHeader>
      {(request && request.CanUpdateStatus) || true ? (
        <RequestAdder request={request} match={match} />
      ) : null}
      {replies ? (
        <VerticalTimeline>
          {replies.map((reply) => {
            return (
              <VerticalTimelineElement
                key={reply.Id}
                className="vertical-timeline-element--education"
                date={moment(reply.CreatedDate, "YYYY-MM-DD").fromNow()}
                iconStyle={{background: "rgb(233, 30, 99)", color: "#fff"}}
                icon={<TimelineIcon title={reply.Status} />}
              >
                <h3 className="vertical-timeline-element-title">
                  {reply.Creator.Name}
                </h3>
                <span className="vertical-timeline-element-subtitle">
                  {reply.Type}{" "}
                </span>
                <span className="vertical-timeline-element-subtitle">
                  {" "}
                  - {reply.CreatedDate}
                </span>
                <p>{reply.Note}</p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      ) : null}
    </div>
  );
};
const mapState = (state, {match}) => {
  const {donation} = state;
  const {region} = state;
  //console.log(request.replies,match.params.id);
  return {
    replies: donation.replies[match.params.id],
    request: donation.donations[match.params.id],
    regions: region.regions,
  };
};
const mapDispatch = (dispatch) => {
  return {
    dispatch,
    fetchDonationDetailsStart: (Id) => dispatch(fetchDonationDetailsStart(Id)),
    fetchDonationRequestThreadStart: (Id) =>
      dispatch(fetchDonationRequestThreadStart(Id)),
    fetchDonationItemsStart: (Id) => dispatch(fetchDonationItemsStart(Id)),
  };
};
export default connect(mapState, mapDispatch)(RequestDetail);
