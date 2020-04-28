import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from '../timeline';
import { ThreadHeader } from './request.styles';
import RequestAdder from './request.adder';
import { connect } from 'react-redux';
import moment from 'moment'
import RegionSelector from '../region/region.selector';
import Modal from '../modal/modal.component';
const RequestDetail = ({ match, replies, request, dispatch, regions }) => {
    const [state, setState] = useState({ modal: false });
    const TimelineIcon = ({ title }) => {
        return (
            <span className='customIcon'>{title}</span>
        )
    }
    const openModal = () => {
        setState({ ...state, modal: true });
    }
    const closeModal = () => {
        setState({ ...state, modal: false });
    }
    const handleSubmit = () => {
        const payloadRegions = Object.keys(regions).map(key => {
            return {
                RegionLevel: regions[key].RegionLevel,
                RequestId: request.Id,
                Id:key,
                Region: {
                    Id: regions[key][regions[key].RegionLevel].Id
                }
            }
        })
        dispatch({
            type: 'MODIFY_REQUEST_REGIONS', payload: {
                Organization: {
                    Id: request.Organization.Id
                },
                Type:request.Type,
                EntityType:request.EntityType,
                Regions: payloadRegions,
                
            }
        })
    }
    return (
        <div className='page-right'>
            <ThreadHeader>
                <h2 className='tread-title'>
                    Request Thread
            </h2>
                {
                    request && request.CanUpdateRegions ? <span className='tread-actions'>
                        <button onClick={openModal}>Update Regions</button>
                    </span> : null
                }
                {
                    state.modal ? <Modal closeModal={closeModal}>
                        <RegionSelector />
                        <button onClick={handleSubmit}>Save Regions</button>
                    </Modal> : null
                }
                <span className='tread-topic'>
                    {
                        request ? request.Entity.Name + ' has requested to ' + request.Type + '. The current status is ' + request.Status : null
                    }
                </span>
            </ThreadHeader>
            {request && request.CanUpdateStatus ? <RequestAdder request={request} match={match} /> : null}
            {replies ? <VerticalTimeline>
                {
                    replies.map(reply => {
                        return (
                            <VerticalTimelineElement
                                key={reply.Id}
                                className="vertical-timeline-element--education"
                                date={moment(reply.CreatedDate, "YYYY-MM-DD").fromNow()}
                                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                icon={<TimelineIcon title={reply.Status} />}
                            >
                                <h3 className="vertical-timeline-element-title">{reply.Creator.Name}</h3>
                                <span className="vertical-timeline-element-subtitle">{reply.Type} </span>
                                <span className="vertical-timeline-element-subtitle"> - {reply.CreatedDate}</span>
                                <p>{reply.Note}</p>
                            </VerticalTimelineElement>
                        )
                    })
                }
            </VerticalTimeline> : null}
        </div>
    )
}
const mapState = (state, { match }) => {
    const { request } = state;
    const { region } = state;
    //console.log(request.replies,match.params.id);
    return {
        replies: request.replies[match.params.id],
        request: request.requests[match.params.id],
        regions: region.regions
    }
}
export default connect(mapState)(RequestDetail);