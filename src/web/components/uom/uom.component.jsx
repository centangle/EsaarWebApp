import React from 'react';
import { connect } from 'react-redux';
import './uom.styles.scss';
import Select from 'react-select'
const Uom = ({uoms,onSelect,placeholder,value,...otherProps}) =>{
    const mappedUoms = Object.keys(uoms).map(key=>{
        return {value:uoms[key].Id,label:uoms[key].Name}
    })
    return(
        <div className='uom-dropdown'>
            <Select defaultValue={value} onChange={onSelect} placeholder={placeholder} options={mappedUoms} {...otherProps} />
        </div>
    )
}
const mapState = (state)=>{
    const {uom} = state;
    return {
        uoms:uom.uoms
    }
}
export default connect(mapState)(Uom);