import React,{useState} from 'react';
import {connect} from 'react-redux'
const ItemAdder = ({dispatch}) =>{
    const [state,setState] = useState({Name:'',NativeName:'',Description:'',ImageUrl:'',ImageInBase64:''})
    const handleClick = () => {
        dispatch({
            type: 'ADD_ITEM_START',
            payload: {
                "Name": state.Name,
                "NativeName": state.NativeName,
                "Description": state.Description,
                "ImageUrl": state.ImageUrl,
                "ImageInBase64": state.ImageInBase64,
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
            <input placeholder='ImageUrl' type='text' onChange={handleChange} name="ImageUrl" value={ImageUrl} />
            <input placeholder='binary'type='text' onChange={handleChange} name="ImageInBase64" value={ImageInBase64} />

            <button onClick={handleClick}>Add Item</button>
        </div>
    )
}
export default connect()(ItemAdder);

