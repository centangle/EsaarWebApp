import React, { useState } from 'react';
import Modal from '../modal/modal.component';
import ItemSelector from '../item/item.selector';
import { connect } from 'react-redux';
import GridToList from '../grid-to-list/grid-to-list.component';
import { TitleWithAction, PreSearch } from './organization.styles';
import Search from "../search/search.component";
import Pagination from "react-js-pagination";
import { params } from "../../../common/utility/request";
const OrganizationItems = ({ dispatch, organization, items, selectedItems, activePage, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }) => {
    const checkIfAdded = (item) => {
        const find = selectedItems.findIndex(i => i.Item.Id === item.Id) > -1;
        if (find) {
            return "Remove";
        } else {
            return "Add";
        }
    }
    const mappedItems = items.map(item => {
        return {
            ...item, added: checkIfAdded(item, items)
        }
    });
    const [state, setState] = useState({
        modal: false, MyItemsOnly: '',
        mappedItems: mappedItems
    });
    const openModal = () => {
        setState({ ...state, modal: true });
    }
    const closeModal = () => {
        setState({ ...state, modal: false });
    }
    const onSelect = (item) => {
        const find = selectedItems.findIndex(i => i.Item.Id === item.Id) > -1;
        if (find) {
            dispatch({ type: 'REMOVE_ORG_ITEMS_START', payload: { organizationId: organization.Id, itemId: item.Id } });
        } else {
            dispatch({ type: 'ADD_ORG_ITEMS_START', payload: { Organization: organization, Item: item } });
        }

    }
    const onDeselect = (item) => {
        dispatch({ type: 'REMOVE_ORG_ITEMS_START', payload: { organizationId: organization.Id, itemId: item.Id } });
    }
    const handleClick = () => {

    }


    const handlePageChange = (page) => {
        dispatch({
            type: 'FETCH_PERIFERAL_ITEMS_START', payload: organization.Id,
            params: { activePage: page, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }
        })
    }
    const handleSearch = (term, filters) => {
        dispatch({
            type: "FETCH_PERIFERAL_ITEMS_START",
            payload: organization.Id,
            params: { ...params, name: term },
        });
    };
    const handleChange = ({ name, value }) => {
        setState({
            ...state, [name]: value,
            mappedItems: !value ? mappedItems : state.mappedItems.filter(item => checkIfAdded(item) === 'Remove')
        });
    }
    const buttonsWithActions = [{ label: checkIfAdded, action: onSelect }];
    return (
        <>
            <TitleWithAction>
                <h2>{organization ? organization.Name : null} Items</h2>
                {/* <button onClick={openModal}>Add New</button> */}
            </TitleWithAction>
            {/* <div className='modal-holder'>
                {state.modal ? <Modal closeModal={closeModal}>
                    <ItemSelector selected={mappedItems} onSelect={onSelect} onDeselect={onDeselect} />
                </Modal> : null}
            </div> */}
            <PreSearch>
                <label>
                    Added Items Only:
                <input name="MyItemsOnly" checked={state.MyItemsOnly} onChange={(event) => handleChange({ name: event.target.name, value: event.target.checked })} type='checkbox' />
                </label>
            </PreSearch>
            <Search
                filters={{
                    location: ["Lahore", "Islamabad"],
                    categories: ["Education", "Health"],
                }}
                type='organization-items'
                handleSearch={handleSearch}
            />
            <GridToList handleClick={handleClick} buttonsWithActions={buttonsWithActions} type='ORGANIZATION' data={state.mappedItems} />
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
    const { organization } = state;
    const { item } = state;
    return {
        selectedItems: organization.items,
        items: item.periferalItems,
        activePage: item && item.activePage ? item.activePage : 0,
        totalItemsCount: item && item.totalItemsCount ? item.totalItemsCount : 0,
        itemsCountPerPage: item && item.itemsCountPerPage ? item.itemsCountPerPage : 0,
        pageRangeDisplayed: item && item.pageRangeDisplayed ? item.pageRangeDisplayed : 0
    }
}
export default connect(mapState)(OrganizationItems);