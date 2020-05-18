import React, { useState } from 'react';
import Modal from '../modal/modal.component';
import ItemSelector from '../item/item.selector';
import { connect } from 'react-redux';
import GridToList from '../grid-to-list/grid-to-list.component';
import { TitleWithAction } from './campaign.styles';
import Search from "../search/search.component";
import Pagination from "react-js-pagination";
import { params } from "../../../common/utility/request";
import ItemWithQtySelector from '../item/item.withqty.selector';
const CampaignItems = ({ dispatch, campaign, items, selectedItems, activePage, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }) => {
    const [state, setState] = useState({ modal: false,addedItems:selectedItems.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {}) });
    const openModal = () => {
        setState({ ...state, modal: true });
    }
    const closeModal = () => {
        setState({ ...state, modal: false });
    }
    const onSelect = (item) => {
        const find = selectedItems.findIndex(i => i.Item.Id === item.Id) > -1;
        if (find) {
            dispatch({ type: 'REMOVE_CAMPAIGN_ITEMS_START', payload: { campaignId: campaign.Id, itemId: item.Id } });
        } else {
            dispatch({ type: 'ADD_CAMPAIGN_ITEMS_START', payload: { Campaign: campaign, Item: item } });
        }

    }
    const onDeselect = (item) => {
        dispatch({ type: 'REMOVE_CAMPAIGN_ITEMS_START', payload: { campaignId: campaign.Id, itemId: item.Id } });
    }
    const handleClick = () => {

    }
    const checkIfAdded = (item) => {
        const find = selectedItems.findIndex(i => i.Item.Id === item.Id) > -1;
        if (find) {
            return "Remove";
        } else {
            return "Add";
        }
    }
    const mappedItems = items.map(item => { return { ...item, added: checkIfAdded(item) } });

    const handlePageChange = (page) => {
        dispatch({
            type: 'FETCH_PERIFERAL_ITEMS_START', payload: campaign.Id,
            params: { activePage: page, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }
        })
    }
    const handleSearch = (term, filters) => {
        dispatch({
            type: "FETCH_PERIFERAL_ITEMS_START",
            payload: campaign.Id,
            params: { ...params, name: term },
        });
    };
    const buttonsWithActions = [{ label: checkIfAdded, action: onSelect }];
    const handleAdd = (input) => {
        setState({
            ...state,
            addedItems: {
                ...state.addedItems,
                [input.Item.Id]: { Item: input.Item, ItemQuantity: input.ItemQuantity, ItemUOM: input.ItemUOM }
            }
        });
    }
    const handleRemove = (item) => {
        //console.log(item,state.addedItems);
        const filteredKeys = state.addedItems;
        delete filteredKeys[item.Id];
        setState({
            ...state,
            addedItems: { ...filteredKeys }
        });
    }
    const handleSave = () =>{
        console.log(state.addedItems);
        const items = Object.keys(state.addedItems).map(key=>{
            return{
                Id:state.addedItems[key].Item.Id ,
                Target: state.addedItems[key].ItemQuantity,
                UOMId: state.addedItems[key].ItemUOM.Id
            }
        })
        const payload = {
            CampaignId:campaign.Id,
            Items:items
        }
        dispatch({type:'ADD_CAMPAIGN_ITEMS_START',payload})
    }
    return (
        <>
            <TitleWithAction>
                <h2>{campaign ? campaign.Name : null} Items</h2>
                <button onClick={openModal}>Add New</button>
            </TitleWithAction>
            <div className='modal-holder'>
                {state.modal ? <Modal closeModal={closeModal}>
                    <ItemWithQtySelector
                        handleAdd={handleAdd} handleRemove={handleRemove}
                        addedItems={state.addedItems}
                    />
                    <button onClick={handleSave}>Save</button>
                </Modal> : null}
            </div>
            <Search
                filters={{
                    location: ["Lahore", "Islamabad"],
                    categories: ["Education", "Health"],
                }}
                handleSearch={handleSearch}
            />
            <GridToList handleClick={handleClick} buttonsWithActions={buttonsWithActions} type='CAMPAIGN' data={selectedItems} />
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={handlePageChange.bind(this)}
            />
        </>
    )
}
const mapState = (state) => {
    const { campaign } = state;
    const { item } = state;
    return {
        selectedItems: campaign.items,
        items: item.periferalItems,
        activePage: item && item.activePage ? item.activePage : 0,
        totalItemsCount: item && item.totalItemsCount ? item.totalItemsCount : 0,
        itemsCountPerPage: item && item.itemsCountPerPage ? item.itemsCountPerPage : 0,
        pageRangeDisplayed: item && item.pageRangeDisplayed ? item.pageRangeDisplayed : 0
    }
}
export default connect(mapState)(CampaignItems);