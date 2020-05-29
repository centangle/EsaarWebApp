import React from 'react';
import { connect } from 'react-redux';
import GridToList from '../grid-to-list/grid-to-list.component';
import { DonationHolder } from './donate.styles';
import Pagination from "react-js-pagination";
import Map from '../map/map.component';
import DatePicker from "react-datepicker";
import UploaderComponent from '../uploader/uploader.component';
import "react-datepicker/dist/react-datepicker.css";
const baseUrl = require('../../../common/utility/request').baseUrl;

const Donate = ({ files, organization, PrefferedCollectionTime, AddressLatLong, latitude, longitude, items, dispatch, activePage, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }) => {

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
    const handleChange = (selected) => {
        dispatch({ type: 'CHANGE_DONATION_DETAILS', payload: selected })
        //setState({ ...state, [name]: value });
    }
    const buttonsWithActions = [{ label: 'Add', action: handleClick }]
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
            <div className='other-inputs'>
                <label>
                    Pickup Location
                    <input type='text' name="AddressLatLong" value={AddressLatLong} onChange={(event) => handleChange({ name: event.target.name, value: event.target.value })} />
                </label>
                <label>
                    Preffered Pickup time
                <DatePicker
                        name="PrefferedCollectionTime"
                        showTimeSelect
                        dateFormat="Pp"
                        selected={new Date(PrefferedCollectionTime)}
                        onSelect={(date) => handleChange({ name: 'PrefferedCollectionTime', value: date })} //when day is clicked
                        onChange={(date) => handleChange({ name: 'PrefferedCollectionTime', value: date })} //only when value has changed
                    />
                </label>

            </div>
            <div className='map-holder'>
                <Map />
            </div>
            <div className='attachment-holder'>
                <UploaderComponent title="Upload Photos" />
                <div className='files-holder'>
                    {
                        files.map(f => {
                            return (
                                <div key={f.file} className='inline-tr'>
                                    <img src={baseUrl + '/' + f.file} alt="File" />
                                    <input name={`naam-${f.file}`} type='text' onChange={(e) => handleChange(e, f)} placeholder='Name' />
                                    <textarea name={`kaam-${f.file}`} onChange={(e) => handleChange(e, f)} className='note'></textarea>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </DonationHolder>
    )
}
const mapState = (state, { match, type }) => {
    const { organization, campaign, user, donation, upload } = state;
    let items = [];

    if (type === 'campaign') {
        items = campaign.items;
    }
    if (type === 'organization') {
        items = organization.items;
    }

    return {
        files: upload.files,
        latitude: user.latitude,
        longitude: user.longitude,
        AddressLatLong: donation.AddressLatLong,
        PrefferedCollectionTime: donation.PrefferedCollectionTime,
        //organization: organization.organizations[match.params.id],
        items,
        activePage: organization && organization.activePage ? organization.activePage : 0,
        totalItemsCount: organization && organization.totalItemsCount ? organization.totalItemsCount : 0,
        itemsCountPerPage: organization && organization.itemsCountPerPage ? organization.itemsCountPerPage : 0,
        pageRangeDisplayed: organization && organization.pageRangeDisplayed ? organization.pageRangeDisplayed : 0
    }
}
export default connect(mapState)(Donate);