import React, { useState } from 'react';
import { connect } from 'react-redux';
import {FormHolder} from './request.styles';
const RequestAdder = ({ dispatch,match,statuses }) => {
    const [state, setState] = useState({ Note: '',Status:'' })
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
                // "Attachments": [
                //     {
                //         "Url": "string",
                //     },
                //     {
                //         "Url": "string",
                //     }
                // ],
                "Note": state.Note,
            }
        })
    }
    const handleChange = (event) => {
        console.log(event.target.name);
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const { Note,Status } = state;
    return (
        <FormHolder>
            <select value={state.Status} name='Status' onChange={(event) => handleChange(event)} >
                {
                    Object.keys(statuses).map(key=>{
                        return(
                            <option key={key} value={key}>{key}</option>
                        )
                    })
                }
            </select>
            <input className='reply' placeholder='Reply' type='text' onChange={handleChange} name="Note" value={Note} />
            <button className='submit' onClick={handleClick}>Add Replies</button>
        </FormHolder>
    )
}
const mapState = (state)=>{
    const {request} = state;
    return{
        statuses:request.status
    }
}
export default connect(mapState)(RequestAdder);

