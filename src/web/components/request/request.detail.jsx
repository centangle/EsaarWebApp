import React, { useState, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "../timeline";
import { ThreadHeader } from "./request.styles";
import RequestAdder from "./request.adder";
import { connect } from "react-redux";
import moment from "moment";
import RegionSelector from "../region/region.selector";
import Modal from "../modal/modal.component";
import {
  fetchOrgRequestDetailStart,
  fetchOrgRequestThreadStart
} from "../../../common/redux/request/request.actions";
const baseUrl = require('../../../common/utility/request').baseUrl;
const RequestDetail = ({
  replyModal, fetchOrgRequestDetailStart, fetchOrgRequestThreadStart,
  match, replies, request, dispatch, regions, detailModal, openThread
}) => {
  useEffect(() => {
    fetchOrgRequestDetailStart(match.params.id);
    fetchOrgRequestThreadStart(match.params.id);
  }, [
    fetchOrgRequestDetailStart,
    fetchOrgRequestThreadStart,
    match.params.id,
  ]);
  const [state, setState] = useState({ modal: false });
  const TimelineIcon = ({ title }) => {
    return <span className="customIcon">{title}</span>;
  };
  const openModal = () => {
    setState({ ...state, modal: true });
  };
  const closeModal = () => {
    setState({ ...state, modal: false });
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
  const handleOpenDetail = (id) => {
    //console.log(request,id);
    dispatch({ type: 'FETCH_ORG_THREAD_DETAIL_START', payload: { requestId: request.Id, id } })
  }
  const handleCloseDetail = () => {
    dispatch({ type: 'CLOSE_ORG_THREAD_MODAL' });
  }
  const handleOpenReply = () => {
    dispatch({ type: 'OPEN_REPLY_MODAL' })
  }
  const handleCloseReplyModal = () => {
    dispatch({ type: 'CLOSE_REPLY_MODAL' });
  }
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
        {
          detailModal ? <Modal closeModal={handleCloseDetail} >
            <h4>
              {
                openThread && openThread.Creator && openThread.EntityType
                + ' created by ' + openThread.Creator.Name
                + ' on ' + openThread.CreatedDate
              }
            </h4>
            <span>Current Status: {openThread && openThread.Status}</span>
            <p>
              {
                openThread && openThread.Note
              }
            </p>
            <div>
              {
                openThread && openThread.Attachments && openThread.Attachments.map(image => {
                  return (
                    <img key={image.Url} src={baseUrl + image.Url} alt='attachment' />
                  )
                })
              }
            </div>
          </Modal> : null
        }
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
            ? request.Entity.Name +
            " has requested to " +
            request.Type +
            ". The current status is " +
            request.Status
            : null}
        </span>
        <button className='reply-btn' onClick={handleOpenReply}>Reply</button>
      </ThreadHeader>
      {
        replyModal ? <Modal closeModal={handleCloseReplyModal}>
          {(request && request.CanUpdateStatus) || true ? (
            <RequestAdder request={request} match={match} />
          ) : null}
        </Modal> : null
      }
      {replies ? (
        <VerticalTimeline>
          {replies.map((reply) => {
            return (
              <VerticalTimelineElement
                key={reply.Id}
                className="vertical-timeline-element--education"
                date={moment(reply.CreatedDate, "YYYY-MM-DD").fromNow()}
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={<TimelineIcon title={reply.Status} />}
              >
                <h3 onClick={() => handleOpenDetail(reply.Id)} className="vertical-timeline-element-title">
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
const mapState = (state, { match }) => {
  const { request, region } = state;
  //console.log(request.replies,match.params.id);
  return {
    replies: request.replies[match.params.id],
    request: request.requests[match.params.id],
    regions: region.regions,
    detailModal: request.detailModal,
    openThread: request.openThread,
    replyModal: request.replyModal
  };
};
const mapDispatch = (dispatch) => {
  return {
    dispatch,
    fetchOrgRequestDetailStart: (Id) => dispatch(fetchOrgRequestDetailStart(Id)),
    fetchOrgRequestThreadStart: (Id) =>
      dispatch(fetchOrgRequestThreadStart(Id))
  };
};
export default connect(mapState, mapDispatch)(RequestDetail);
