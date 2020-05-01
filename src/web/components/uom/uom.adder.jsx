import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormHolder } from './uom.styles';
const UomAdder = ({ dispatch, uom }) => {
    const [state, setState] = useState({
        Name: uom?uom.Name:'', NativeName:uom?uom.NativeName: '',
        Description:uom?uom.Description: '', NoOfBaseUnit:uom?uom.NoOfBaseUnit: ''
    })
    const handleClick = () => {
        let type='ADD_UOM_START';
        let Id = 0;
        if(uom){
            type='UPDATE_UOM_START';
            Id = uom.Id;
        }
        dispatch({
            type,
            payload: {
                ...uom,
                "Name": state.Name,
                "NativeName": state.NativeName,
                "Description": state.Description,
                "NoOfBaseUnit":state.NoOfBaseUnit,
                "Id": Id
            }
        })
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const { Name, NativeName, Description,NoOfBaseUnit } = state;
    return (
        <FormHolder>
            <h2>Add/Edit Unit of measurement</h2>
            <div className='two-panel'>
                <div className='input-holder'>
                    <input placeholder='Name' type='text' onChange={handleChange} name="Name" value={Name} />
                    <input placeholder='Native Name' type='text' onChange={handleChange} name="NativeName" value={NativeName} />
                    <input placeholder='Base Unit' type='text' onChange={handleChange} name="NoOfBaseUnit" value={NoOfBaseUnit} />
                    <textarea placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description}></textarea>
                    <button onClick={handleClick}>Save UOM</button>
                </div>
            </div>
        </FormHolder>
    )
}
const mapState = (state) => {
    const { uom } = state;
    return {
        uom: uom.current
    }
}
export default connect(mapState)(UomAdder);

