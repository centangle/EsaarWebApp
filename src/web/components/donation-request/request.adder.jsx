import React, { useState } from 'react';
import { connect } from 'react-redux';
import {FormHolder} from './request.styles';
import Modal from '../modal/modal.component';
const RequestAdder = ({ dispatch,match,statuses,request,items }) => {
    const [state, setState] = useState({ Note: '',Status:'',modal:false,uom:'' })
    const handleClick = () => {
        dispatch({
            type: 'ADD_REQUEST_THREAD_START',
            payload: {
                "Entity": {
                    "Id": request.DonationRequestOrganization.Id
                },
                "EntityType": "Donation",
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
        if(event.target.value==='Approved'){
            setState({ ...state, [event.target.name]: event.target.value,modal:true });
        }else{
            setState({ ...state, [event.target.name]: event.target.value,modal:false });
        }
    }
    const handleClose = ()  =>{
        setState({...state,modal:false});
    }
    const handleDrop = (e,item) =>{
        dispatch({type:'DONATION_UOM_CHANGED',payload:{ApprovedQuantityUOM:e.target.value,item}});
    }
    const handleQuantityChange = (e,item) =>{
        dispatch({type:'DONATION_QUANTITY_CHANGED',payload:{ApprovedQuantity:e.target.value,item}})
    }
    const handleApproveSubmit = () =>{
        dispatch({type:'ADD_DONATION_APPROVAL_START',payload:{Items:items,Id:request.Id}})
    }
    const { Note,Status } = state;
    return (
        <FormHolder>
            {
                state.modal?<Modal closeModal={handleClose}>
                    <h1>Modify Request</h1>
                    <div className='item-adjust'>
                        <div className='item'>
                            <span></span>
                            <span className='r'>Quantity</span>
                            <span className='u'>Unit</span>
                        </div>
                    {
                        items.map(item=>{
                            const ApprovedQuantityUOM = item.ApprovedQuantityUOM.Id;
                            return(
                                <div className='item' key={item.Item.Id}>
                                    <span>{item.Item.Name}</span>
                                    <input className='r' value={item.ApprovedQuantity} onChange={(e)=>handleQuantityChange(e,item)} type='text' name="Quantity" />
                                    <select className='u' value={ApprovedQuantityUOM} onChange={(e)=>handleDrop(e,item)}>
                                        <option value={0} disabled>Select Qty</option>
                                        {
                                            item.ItemUOMs.map(uom=>{
                                                return(
                                                    <option key={uom.Id} value={uom.Id}>{uom.Name}</option>
                                                )
                                            })
                                        }
                                </select>
                                </div>
                            )
                        })
                    }
                    <textarea placeholder='Note'></textarea>
                    <button onClick={handleApproveSubmit}>Save</button>
                    </div>
                </Modal>:false
            }
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
    const {item} = state;
    return{
        statuses:request.status,
        items:item.items
    }
}
export default connect(mapState)(RequestAdder);

