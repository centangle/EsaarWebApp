import React,{useState} from 'react';
import {connect} from 'react-redux'
const UomAdder = ({dispatch}) =>{
    const [state,setState] = useState({Name:'',NativeName:'',Description:'',ImageUrl:'',ImageInBase64:''})
    const handleClick = () => {
        dispatch({
            type: 'ADD_UOM_START',
            payload: {
                "Name": state.Name,
                "NativeName": state.NativeName,
                "Description": state.Description,
                "IsCartItem": false,
                "Id": 0
            }
        })
    }
    const handleChange = (event) =>{
        setState({...state,[event.target.name]:event.target.value})
    }
    const {Name,NativeName,Description,ImageUrl,ImageInBase64} = state;
    return (
        <div>
            <h2>Item</h2>
            <input placeholder='Name' type='text' onChange={handleChange} name="Name" value={Name} />
            <input placeholder='Native Name' type='text' onChange={handleChange} name="NativeName" value={NativeName} />
            <input placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description} />
            <button onClick={handleClick}>Add Item</button>
        </div>
    )
}
export default connect()(UomAdder);

