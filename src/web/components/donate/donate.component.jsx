import React from 'react';
import { connect } from 'react-redux';
import GridToList from '../grid-to-list/grid-to-list.component';
import {DonationHolder} from './donate.styles';
const Donate = ({ organization, items,dispatch }) => {
    const mapItems = items.map(item=>{
        return {...item.Item,ItemUOMs:item.ItemUOMs,Description:""}
    });
    const handleClick = (item) =>{
        dispatch({type:'ADD_DONATION_ITEM',payload:item})
    }
    return (
        <DonationHolder>
            <GridToList data={mapItems} handleClick={handleClick} />
        </DonationHolder>
    )
}
const mapState = (state, { match }) => {
    const { organization } = state;
    return {
        //organization: organization.organizations[match.params.id],
        items: organization.items
    }
}
export default connect(mapState)(Donate);