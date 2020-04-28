import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
import { TitleWithAction, FormHolder } from './organization.styles';
import Modal from '../modal/modal.component';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';

import { fetchUomStart } from '../../../common/redux/setting/setting.actions';

const OrganizationAccounts = ({ accounts, organizations, dispatch, organization, fetchUomStart, form }) => {
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
        dispatch({ type: 'CLOSE_MODAL', payload: 'ORG' });
    }
    const openModal = () => {
        dispatch({ type: 'OPEN_MODAL', payload: 'ORG' });
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleSubmit = () => {
        const form = { ...state };
        delete form['modal'];
        delete form['addedItems'];

        dispatch({
            type: 'ADD_ORG_ACCOUNT_START', payload: {
                ...form, Organization: organization
            }
        })
    }

    const { Name, NativeName, Description, AccountNo, ImageUrl, ImageInBase64 } = state;

    return (
        <>
            <TitleWithAction>
                <h2>{organization ? organization.Name : null} Accounts</h2>
                <button onClick={openModal}>Add a accounts</button>
            </TitleWithAction>
            <div className='btn'>
                {form.modal ? <Modal closeModal={closeModal}>
                    <h2>Add Organization Office</h2>
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
            </div>
        </>
    )
}
const mapState = (state) => {
    const { organization } = state;
    
    return {
        accounts: organization.accounts,
        organizations: organization.organizations,
        organization: organization.current,
        items: organization.items,
        form: organization.form
    }
}
const mapDispatch = dispatch => ({
    fetchUomStart: () => dispatch(fetchUomStart()),
})
export default connect(mapState, mapDispatch)(OrganizationAccounts);