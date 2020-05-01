import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormHolder } from './item.styles';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';
import UomInput from '../uom/uom.overview';
const ItemAdder = ({ dispatch,logo,current }) => {
    const [state, setState] = useState({ 
        Name: current?current.Name:'', NativeName:current?current.NativeName: '',
        DefaultUOM:current?{value:current.DefaultUOM.Id,label:current.DefaultUOM.Name}:'',
        Description:current?current.Description: '', ImageUrl:current?current.ImageUrl: '', ImageInBase64: ''
    })
    const handleClick = () => {
        let type='ADD_ITEM_START';
        let Id=0;
        if(current){
            type='UPDATE_ITEM_START'
            Id=current.Id
        }
        dispatch({
            type,
            payload: {
                ...current,
                "Name": state.Name,
                "NativeName": state.NativeName,
                "Description": state.Description,
                "DefaultUOM":{Id:state.DefaultUOM.value},
                "ImageUrl": logo,
                "ImageInBase64": state.ImageInBase64,
                "IsCartItem": false,
                "Id": Id
            }
        })
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleDrop = (selected) =>{
        console.log(selected);
        setState({...state,DefaultUOM:selected});
    }
    const { Name, NativeName, Description,DefaultUOM, ImageUrl, ImageInBase64 } = state;
    return (
        <FormHolder>
            <h2>{current?'Update Item':'Add New Item'}</h2>
            <div className='two-panel'>
                <div className='uploader'>
                    <UploadedComponent logo />
                    <UploaderComponent title="Add Logo" type="ItemLogo" item="1" />
                </div>
                <div className='input-holder'>
                    <input placeholder='Name' type='text' onChange={handleChange} name="Name" value={Name} />
                    <input placeholder='Native Name' type='text' onChange={handleChange} name="NativeName" value={NativeName} />
                    <UomInput value={DefaultUOM} onSelect={handleDrop} placeholder='Units' />
                    <textarea placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description}></textarea>
                </div>
            </div>
            <button onClick={handleClick}>{current?'Update Item':'Add Item'}</button>
        </FormHolder>
    )
}
const mapState = (state) =>{
    const {item} = state;
    return{
        logo:item.logo,
        current:item.current
    }
}
export default connect(mapState)(ItemAdder);

