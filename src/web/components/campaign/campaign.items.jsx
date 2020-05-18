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
import DataTable from "../table/DataTable/DataTable";
const CampaignItems = ({ modal,dispatch, campaign, items, selectedItems, activePage, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }) => {
    const [state, setState] = useState({
        modal: false, addedItems: selectedItems.reduce((obj, item) => {
            obj[item.Id] = item
            return obj
        }, {})
    });
    const openModal = () => {
        dispatch({type:'OPEN_MODAL',payload:'CAMPAIGN_ITEMS_MODAL'})
    }
    const closeModal = () => {
        dispatch({type:'CLOSE_MODAL'})
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
        // const find = selectedItems.findIndex(i => i.Item.Id === item.Id) > -1;
        // if (find) {
        //     return "Remove";
        // } else {
        //     return "Add";
        // }
    }
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
        let mappedItem = input;
        mappedItem.CampaignItemUOM = input.ItemUOM;
        mappedItem.CampaignItemTarget = input.ItemQuantity;

        //const findvalue = Object.keys(state.addedItems).map(i=>{return {ItemUOM:state.addedItems[i].CampaignItemUOM,ItemQuantity:state.addedItems[i].CampaignItemTarget,Item:state.addedItems[i].Item}})
        setState({
            ...state,
            addedItems: {
                ...state.addedItems,
                [input.Item.Id]: { ...mappedItem }
            }
        });
    }
    const handleRemove = (item) => {
        //console.log(item,state.addedItems);
        console.log(item);
        console.log(state.addedItems);
        const filteredKeys = state.addedItems;
        delete filteredKeys[item.Id];
        setState({
            ...state,
            addedItems: { ...filteredKeys }
        });
    }
    const handleSave = () => {

        const items = Object.keys(state.addedItems).map(key => {
            return {
                "Id":key,
                "Item": {
                    "Id": state.addedItems[key].Item.Id
                },
                "CampaignItemTarget": state.addedItems[key].CampaignItemTarget,
                "CampaignItemUOM": {
                    "Id": state.addedItems[key].CampaignItemUOM.Id
                }
            }
        })
        const payload = {
            CampaignId: campaign.Id,
            Items: items
        }
        dispatch({ type: 'ADD_CAMPAIGN_ITEMS_START', payload })
    }
    const mappedItems = Object.keys(state.addedItems).map(key => { return { ...state.addedItems[key] }});
    const columns = [
        {
            name: "Name",
            selector: "Item.Name",
            sortable: true,
        },
        {
            name: "Target Quantity",
            selector: "CampaignItemTarget",
            sortable: true,
        },
        {
            name: "Unit",
            selector: "CampaignItemUOM.Name",
            sortable: true,
        },
    ];
    console.log(mappedItems);
    return (
        <>
            <TitleWithAction>
                <h2>{campaign ? campaign.Name : null} Items</h2>
                <button onClick={openModal}>Add New</button>
            </TitleWithAction>
            <div className='modal-holder'>
                {modal ? <Modal closeModal={closeModal}>
                    <ItemWithQtySelector
                        handleAdd={handleAdd} handleRemove={handleRemove}
                        addedItems={Object.keys(state.addedItems).map(i => {
                            return {
                                ItemUOM: state.addedItems[i].CampaignItemUOM,
                                ItemQuantity: state.addedItems[i].CampaignItemTarget,
                                Item: state.addedItems[i].Item,
                                ...state.addedItems[i]
                            }
                        })}
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
            <DataTable noHeader columns={columns} data={mappedItems} />
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
        modal:campaign.form.campaignItemModal,
        items: item.periferalItems,
        activePage: item && item.activePage ? item.activePage : 0,
        totalItemsCount: item && item.totalItemsCount ? item.totalItemsCount : 0,
        itemsCountPerPage: item && item.itemsCountPerPage ? item.itemsCountPerPage : 0,
        pageRangeDisplayed: item && item.pageRangeDisplayed ? item.pageRangeDisplayed : 0
    }
}
export default connect(mapState)(CampaignItems);