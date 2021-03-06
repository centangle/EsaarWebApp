import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
import { TitleWithAction, FormHolder } from './campaign.styles';
import Modal from '../modal/modal.component';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';
import Pagination from "react-js-pagination";
import { fetchUomStart } from '../../../common/redux/uom/uom.actions';

const CampaignAccounts = ({ accounts, campaigns, dispatch, campaign, fetchUomStart, form, activePage, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }) => {
    useEffect(() => {
        fetchUomStart();
    }, [fetchUomStart]);
    const [state, setState] = useState({
        addedItems: {},
        modal: form.modal, Name: '', NativeName: '', Description: '', AccountNo: ''
    });
    let history = useHistory();

    const mappedData = accounts.map(request => {
        return {
            Name: request.Name,
            NativeName: request.NativeName,
            Description: request.Description,
            AccountNo: request.AccountNo
        }
    });

    const columns = [
        {
            name: 'Name',
            selector: 'Name',
            sortable: true,
        },
        {
            name: 'NativeName',
            selector: 'NativeName',
            sortable: true,
        },
        {
            name: 'Account Number',
            selector: 'AccountNo',
            sortable: true,
        }
    ];
    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: 'ACCOUNTS' });
    }
    const openModal = () => {
        dispatch({ type: 'OPEN_MODAL', payload: 'ACCOUNTS' });
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleSubmit = () => {
        const form = { ...state };
        delete form['modal'];
        delete form['addedItems'];

        dispatch({
            type: 'ADD_CAMPAIGN_ACCOUNT_START', payload: {
                ...form, Campaign: campaign
            }
        })
    }

    const { Name, NativeName, Description, AccountNo, ImageUrl, ImageInBase64 } = state;
    const handlePageChange = (page) => {
        dispatch({
            type: 'FETCH_CAMPAIGN_ACCOUNTS_START', payload: campaign.Id,
            params: { activePage: page, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }
        })
    }
    return (
        <>
            <TitleWithAction>
                <h2>{campaign ? campaign.Name : null} Accounts</h2>
                <button onClick={openModal}>Add a accounts</button>
            </TitleWithAction>
            <div className='modal-holder'>
                {form.modal ? <Modal closeModal={closeModal}>
                    <h2>Add Campaign Office</h2>
                    <FormHolder>
                        <div className='two-panel'>
                            <div className='uploader'>
                                <UploadedComponent logo />
                                <UploaderComponent title="Add Logo" type="file" item="1" />
                            </div>
                            <div className='input-holder'>
                                <input placeholder='Name' type='text' onChange={handleChange} name="Name" value={Name} />
                                <input placeholder='Native Name' type='text' onChange={handleChange} name="NativeName" value={NativeName} />
                                <input placeholder='Account No.' type='text' onChange={handleChange} name="AccountNo" value={AccountNo} />

                                <textarea placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description}></textarea>
                                <button onClick={handleSubmit}>Add Office</button>
                            </div>
                        </div>
                    </FormHolder>
                </Modal> : null}
            </div>
            <div className='table'>
                <DataTable
                    noHeader
                    columns={columns}
                    data={mappedData}
                />
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={handlePageChange.bind(this)}
                />
            </div>
        </>
    )
}
const mapState = (state) => {
    const { campaign } = state;

    return {
        accounts: campaign.accounts,
        campaigns: campaign.campaigns,
        campaign: campaign.current,
        items: campaign.items,
        form: campaign.form,
        activePage: campaign && campaign.activePage ? campaign.activePage : 0,
        totalItemsCount: campaign && campaign.totalItemsCount ? campaign.totalItemsCount : 0,
        itemsCountPerPage: campaign && campaign.itemsCountPerPage ? campaign.itemsCountPerPage : 0,
        pageRangeDisplayed: campaign && campaign.pageRangeDisplayed ? campaign.pageRangeDisplayed : 0
    }
}
const mapDispatch = dispatch => ({
    fetchUomStart: () => dispatch(fetchUomStart()),
})
export default connect(mapState, mapDispatch)(CampaignAccounts);