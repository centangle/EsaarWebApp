import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';

import { FormHolder } from './campaign.styles';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CAMPAIGNaniztionAdder = ({ events, dispatch, logo, current }) => {
    const [state, setState] = useState({
        Name: current && current.Name ? current.Name : '',
        Event: current && current.Event ? { value: current.Id, label: current.Name } : '',
        StartDate: current && current.StartDate ? current.StartDate : '',
        EndDate: current && current.EndDate ? current.EndDate : '',
        NativeName: current && current.NativeName ? current.NativeName : '',
        Description: current && current.Description ? current.Description : '',
        ImageUrl: current && current.ImageUrl ? current.ImageUrl : '',
        ImageInBase64: current && current.ImageInBase64 ? current.ImageInBase64 : ''
    })
    const handleClick = () => {
        let type = 'ADD_CAMPAIGN_START';
        let id = 0;
        if (current) {
            type = 'UPDATE_CAMPAIGN_START';
            id = current.Id;
        }
        dispatch({
            type,
            payload: {
                "Name": state.Name,
                "StartDate": state.StartDate,
                "EndDate": state.EndDate,
                "NativeName": state.NativeName,
                "Description": state.Description,
                "ImageUrl": logo,
                "ImageInBase64": state.ImageInBase64,
                "Id": id
            }
        })
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleDrop = (item) => {
        setState({ ...state, Event: item });
    }
    const mappedEvents = Object.keys(events).map(key => { return { value: events[key].Id, label: events[key].Name } });
    const handleDateChange = (selected) => {
        const { name, value } = selected;
        setState({ ...state, [name]: value });
    }
    const { Name, NativeName, Event, Description, StartDate, EndDate, ImageUrl, ImageInBase64 } = state;
   console.log(new Date(StartDate));
    return (
        <FormHolder>
            <h2>{current ? 'Update' : 'Add'} your Campaign</h2>
            <div className='two-panel'>
                <div className='uploader'>
                    <UploadedComponent logo />
                    <UploaderComponent title="Add Logo" type="Logo" item="1" />
                </div>
                <div className='input-holder'>
                    <input placeholder='Name' type='text' onChange={handleChange} name="Name" value={Name} />
                    <input placeholder='Native Name' type='text' onChange={handleChange} name="NativeName" value={NativeName} />
                    <Select value={Event} onChange={(item) => handleDrop(item)} options={mappedEvents} className='dropdown' placeholder="Event..." />
                    <textarea placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description}></textarea>
                    <DatePicker
                        name="StartDate"
                        showTimeSelect
                        dateFormat="Pp"
                        selected={new Date(StartDate)}
                        onSelect={(date) => handleDateChange({ name: 'StartDate', value: date })} //when day is clicked
                        onChange={(date) => handleDateChange({ name: 'StartDate', value: date })} //only when value has changed
                    />
                    <DatePicker
                        name="EndDate"
                        showTimeSelect
                        dateFormat="Pp"
                        selected={new Date(EndDate)}
                        onSelect={(date) => handleDateChange({ name: 'EndDate', value: date })} //when day is clicked
                        onChange={(date) => handleDateChange({ name: 'EndDate', value: date })} //only when value has changed
                    />
                    <button type='button' onClick={handleClick}>Save Campaign</button>
                </div>
            </div>
        </FormHolder>
    )
}
const mapState = (state) => {
    const { campaign } = state;
    const { event } = state;
    return {
        logo: campaign.logo,
        events: event.events
    }
}
export default connect(mapState)(CAMPAIGNaniztionAdder);

