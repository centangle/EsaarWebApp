import React, { useState } from 'react';
import './search.styles.scss';
import RegionSelector from '../region/region.selector';
import Modal from '../modal/modal.component';
import { connect } from 'react-redux';
const RequestSearch = ({ handleCheck, regions }) => {
    const initState = { searchType: 'InMyRegion', searchStatus: '', timePeriod: '', startDate: '', endDate: '', memberName: '', modal: false };
    const [state, setState] = useState(initState)
    const handleChange = (event) => {
        let modal = false;
        if (event.target.value === 'ByRegion') {
            modal = true;
        }
        if (event.target.name === 'searchType' || event.target.name === 'status' || event.target.name === 'timePeriod') {
            let removePrevious = false;
            if (event.target.name === 'timePeriod') {
                removePrevious = true;
            }
            handleCheck({
                Id: event.target.value,
                Name: event.target.value,
                value: event.target.value
            }, event.target.name, 0, removePrevious);
        }
        if (event.target.name === 'startDate') {
            handleCheck({
                Id: 'timePeriod',
                Name: 'from:' + event.target.value + 'to:' + state.endDate,
                startDate: event.target.value,
                endDate:state.endDate
            }, 'timePeriod', 0, true);
        }
        if (event.target.name === 'endDate') {
            handleCheck({
                Id: 'timePeriod',
                Name: 'from:' + state.startDate + 'to:' + event.target.value,
                endDate: event.target.value,
                startDate:state.startDate
            }, 'timePeriod', 0, true);
        }

        setState({ ...state, [event.target.name]: event.target.value, modal });
    }
    const handleClose = () => {
        setState({ ...state, modal: false })
    }
    const handleFilter = () => {
        Object.keys(regions).forEach(key => {
            handleCheck({ Id: regions[key][regions[key].RegionLevel].Id, Name: regions[key][regions[key].RegionLevel].Name, ...regions[key] }, 'ByRegion', 0, false);
        });
        setState({ ...state, modal: false, ...initState });
    }
    const handleSubmit = (from) => {
        handleCheck({
            Id: state.InRadius,
            Name: state.Radius + ' ' + state.InRadius,
            radius: parseFloat(state.Radius),
            radiusType: state.InRadius
        }, from, 0, true);
        setState({ ...state, ...initState })
    }
    return (
        <div>
            <div className='filters-input'>
                <select value={state.searchType} onChange={handleChange} name="searchType">
                    <option value="Owner">Owner</option>
                    <option value="Member">Member</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Moderator">Moderator</option>
                </select>
                <select value={state.status} onChange={handleChange} name="status">
                    <option value="Initiated">Initiated</option>
                    <option value="ModeratorAssigned">ModeratorAssigned</option>
                    <option value="InProcess">InProcess</option>
                    <option value="Approved">Approved</option>
                    <option value="VolunteerAssigned">VolunteerAssigned</option>
                    <option value="Collected">Collected</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <select value={state.timePeriod} onChange={handleChange} name="timePeriod">
                    <option value="Today">Today</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    <option value="Custom">Custom</option>
                </select>
                {
                    state.timePeriod === 'Custom' ? <React.Fragment>
                        <input value={state.startDate} name='startDate' onChange={handleChange} type="text" placeholder="Start Date" />
                        <input value={state.endDate} name='endDate' onChange={handleChange} type="text" placeholder="End Date" />
                    </React.Fragment> : null
                }
            </div>
        </div>
    )
}
const mapState = (state) => {
    const { region } = state;
    return {
        regions: region.regions
    }
};
export default connect(mapState)(RequestSearch);