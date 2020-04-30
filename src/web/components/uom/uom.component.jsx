import React from 'react';
import { connect } from 'react-redux';
import './uom.styles.scss';
import Select from 'react-select'
const Uom = ({uoms,onSelect}) =>{
    const handleSelect = (e) =>{
        onSelect(uoms[e.value]);
    }
    const mappedUoms = Object.keys(uoms).map(key=>{
        return {value:uoms[key].Id,label:uoms[key].Name}
    })
    return(
        <div className='uom-dropdown'>
            <Select onChange={handleSelect} options={mappedUoms}/>
        </div>
        
        // <select onChange={handleSelect} className='uom-dropdown'>
        //     <option>Select Unit</option>
        //     {
        //         Object.keys(uoms).map(key=>{
        //             return (
        //                 <option key={uoms[key].Id} value={uoms[key].Id}>{uoms[key].Name}</option>
        //             )
        //         })
        //     }
        // </select>
    )
}
const mapState = (state)=>{
    const {setting} = state;
    return {
        uoms:setting.uoms
    }
}
export default connect(mapState)(Uom);