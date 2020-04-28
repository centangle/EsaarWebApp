import React, { useState } from 'react';
import Modal from '../modal/modal.component';
import ItemSelector from '../item/item.selector';
import { connect } from 'react-redux';
import GridToList from '../grid-to-list/grid-to-list.component';
import { TitleWithAction } from './organization.styles';
const OrganizationItems = ({ dispatch, organization, items }) => {
    const [state, setState] = useState({ modal: false });
    const openModal = () => {
        setState({ ...state, modal: true });
    }
    const closeModal = () => {
        setState({ ...state, modal: false });
    }
    const onSelect = (item) => {
        dispatch({ type: 'ADD_ORG_ITEMS_START', payload: { Organization: organization, Item: item } });
    }
    const onDeselect = (item) => {
        dispatch({ type: 'REMOVE_ORG_ITEMS_START', payload: { organizationId:organization.Id, itemId:item.Id } });
    }
    const handleClick = () =>{

    }
    const mappedItems = items.map(item=>{ return {...item.Item} });

    return (
        <>
            <TitleWithAction>
                <h2>{organization ? organization.Name : null} Items</h2>
                <button onClick={openModal}>Add New</button>
            </TitleWithAction>
            <div className='btn'>
                {state.modal ? <Modal closeModal={closeModal}>
                    <ItemSelector selected={mappedItems} onSelect={onSelect} onDeselect={onDeselect} />
                </Modal> : null}
            </div>
            <GridToList handleClick={handleClick} type='ORGANIZATION' data={mappedItems} />
        </>
    )
}
const mapState = (state) => {
    const { organization } = state;
    return {
        items: organization.items
    }
}
export default connect(mapState)(OrganizationItems);