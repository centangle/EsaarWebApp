import React, { useState } from 'react';
import { connect } from 'react-redux';

import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';

import { FormHolder } from './event.styles';

const EventAdder = ({ dispatch, logo, current }) => {
    const [state, setState] = useState({
        Name: '', NativeName: '', Description: '', ImageUrl: '', ImageInBase64: ''
    })
    const handleClick = () => {
        let type = 'ADD_EVENT_START';
        let id = 0;
        if(current){
            type='UPDTE_EVENT_START';
            id = current.Id;
        }
        dispatch({
            type,
            payload: {
                "Name": state.Name,
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
    const { Name, NativeName, Description, ImageUrl, ImageInBase64 } = state;
    return (
        <FormHolder>
            <h2>{current?"Edit":"Add"} Event</h2>
            <div className='two-panel'>
                <div className='uploader'>
                    <UploadedComponent logo />
                    <UploaderComponent title="Add Logo" type="Logo" item="1" />
                </div>
                <div className='input-holder'>
                    <input placeholder='Name' type='text' onChange={handleChange} name="Name" value={Name} />
                    <input placeholder='Native Name' type='text' onChange={handleChange} name="NativeName" value={NativeName} />
                    <textarea placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description}></textarea>
                    <button type='button' onClick={handleClick}>Save</button>
                </div>
            </div>
        </FormHolder>
    )
}
const mapState = (state) => {
    const { event } = state;
    return {
        logo: event.logo,
        current: event.current
    }
}
export default connect(mapState)(EventAdder);

