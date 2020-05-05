import React from 'react';
import { connect } from 'react-redux';
import GridToList from '../grid-to-list/grid-to-list.component';
import { DonationHolder } from './donate.styles';
import Pagination from "react-js-pagination";
const Donate = ({ organization, items, dispatch, activePage, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }) => {
    const mapItems = items.map(item => {
        return { ...item.Item, ItemUOMs: item.ItemUOMs, Description: "" }
    });
    const handleClick = (item) => {
        dispatch({ type: 'ADD_DONATION_ITEM', payload: item })
    }
    const handlePageChange = (page) => {
        dispatch({
            type: 'FETCH_ORG_ITEMS_START', payload: organization.Id,
            params: { activePage: page, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }
        })
    }
    const buttonsWithActions = [{label:'Add',action:handleClick}]
    return (
        <DonationHolder>
            <GridToList data={mapItems} buttonsWithActions={buttonsWithActions} handleClick={handleClick} />
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={handlePageChange.bind(this)}
            />
        </DonationHolder>
    )
}
const mapState = (state, { match }) => {
    const { organization } = state;
    return {
        //organization: organization.organizations[match.params.id],
        items: organization.items,
        activePage: organization && organization.activePage ? organization.activePage : 0,
        totalItemsCount: organization && organization.totalItemsCount ? organization.totalItemsCount : 0,
        itemsCountPerPage: organization && organization.itemsCountPerPage ? organization.itemsCountPerPage : 0,
        pageRangeDisplayed: organization && organization.pageRangeDisplayed ? organization.pageRangeDisplayed : 0
    }
}
export default connect(mapState)(Donate);