import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TitleWithAction } from './event.styles';
import Modal from '../modal/modal.component';
import { useHistory } from "react-router-dom";
import EventAdder from './event.adder';
import GridToList from '../grid-to-list/grid-to-list.component';
import { params } from '../../../common/utility/request';
import Search from '../search/search.component';
import Pagination from "react-js-pagination";
const Event = ({ data, dispatch, modal, totalItemsCount, pageRangeDisplayed, itemsCountPerPage, activePage }) => {
    let history = useHistory();
    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: 'EVENT' });
    }
    const handleAddOrg = () => {
        dispatch({ type: 'OPEN_MODAL', payload: 'EVENT' });
    }
    const handleClick = (obj) => {
        dispatch({ type: 'EVENT_SELECTED', payload: obj });
        history.push(history.location.pathname + '/' + obj.Id);
    }
    const handleSearch = (term, filters) => {
        dispatch({ type: 'FETCH_EVENT_START', params: { ...params, name: term } });
    }
    const handlePageChange = (page) => {
        dispatch({
            type: 'FETCH_EVENT_START', payload: '',
            params: { activePage: page, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }
        })
    }
    return (
        <div className='page-right'>
            <TitleWithAction>
                {
                    modal ? <Modal closeModal={closeModal}>
                        <EventAdder />
                    </Modal> : null
                }
                <h2>Events</h2>
                <button onClick={handleAddOrg}>Add Events</button>
            </TitleWithAction>
            <Search filters={{ location: ['Lahore', 'Islamabad'], categories: ['Education', 'Health'] }} handleSearch={handleSearch} />
            <GridToList handleClick={handleClick} type='EVENT' data={data} />
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={handlePageChange.bind(this)}
            />
        </div>
    )
}
const mapState = (state) => {
    const { event } = state;
    return {
        data: Object.keys(event.events).map(key => {
            return { ...event.events[key], title: event.events[key].Name }
        }),
        form: event.form,
        modal: event.modal,
        activePage: event.activePage ? event.activePage : 0,
        totalItemsCount: event.totalItemsCount ? event.totalItemsCount : 0,
        itemsCountPerPage: event.itemsCountPerPage ? event.itemsCountPerPage : 0,
        pageRangeDisplayed: event.pageRangeDisplayed ? event.pageRangeDisplayed : 0
    }
}
export default connect(mapState)(Event);