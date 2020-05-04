import React from 'react';
import { connect } from 'react-redux';
import './item.styles.scss';
import Select from 'react-select'
const ItemInputContainer = ({items,onSelect,placeholder,value,...otherProps}) =>{
    const mappedItems = items.map(item=>{
        return {value:item.Id,label:item.Item.Name}
    })
    return(
        <div className='item-dropdown'>
            <Select defaultValue={value} onChange={(item)=>onSelect(items.find(i=>i.Id===item.value).Item)} placeholder={placeholder} options={mappedItems} {...otherProps} />
        </div>
    )
}
const mapState = (state)=>{
    const {organization} = state;
    return {
        items:organization.items
    }
}
export default connect(mapState)(ItemInputContainer);