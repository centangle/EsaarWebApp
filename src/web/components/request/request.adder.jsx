import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormHolder } from './request.styles';
import UploaderComponent from '../uploader/uploader.component';
const baseUrl = require('../../../common/utility/request').baseUrl;
const RequestAdder = ({ files, dispatch, match, statuses }) => {
    const [state, setState] = useState({ Note: '', Status: '' })
    const handleClick = () => {
        dispatch({
            type: 'ADD_REQUEST_THREAD_START',
            payload: {
                "Entity": {
                    "Id": match.params.id,
                },
                "EntityType": "Organization",
                "Status": state.Status,
                "Type": "General",
                Attachments:files.map(file=>{
                    return {Url:file.file}
                }),
                "Note": state.Note,
            }
        })
    }
    const handleChange = (event) => {
        console.log(event.target.name);
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const { Note, Status } = state;
    return (
        <FormHolder>
            <select value={state.Status} name='Status' onChange={(event) => handleChange(event)} >
                {
                    Object.keys(statuses).map(key => {
                        return (
                            <option key={key} value={key}>{key}</option>
                        )
                    })
                }
            </select>
            <input className='reply' placeholder='Reply' type='text' onChange={handleChange} name="Note" value={Note} />
            <div className='attachment-holder'>
                <UploaderComponent title="Upload Photos" />
                <div className='files-holder'>
                    {
                        files.map(f => {
                            return (
                                <div key={f.file} className='inline-tr'>
                                    <img src={baseUrl + '/' + f.file} alt="File" />
                                    <input name={`naam-${f.file}`} type='text' onChange={(e) => handleChange(e, f)} placeholder='Name' />
                                    <textarea name={`kaam-${f.file}`} onChange={(e) => handleChange(e, f)} className='note'></textarea>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button className='submit' onClick={handleClick}>Add Replies</button>
        </FormHolder>
    )
}
const mapState = (state) => {
    const { request, upload } = state;
    return {
        files: upload.files,
        statuses: request.status
    }
}
export default connect(mapState)(RequestAdder);

