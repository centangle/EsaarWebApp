import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
import { TitleWithAction, FormHolder } from './organization.styles';
import Modal from '../modal/modal.component';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';
import Pagination from "react-js-pagination";
import { fetchUomStart } from '../../../common/redux/uom/uom.actions';

const OrganizationOffices = ({ offices, organizations,latitude,longitude, dispatch, organization, fetchUomStart,form,activePage,totalItemsCount,pageRangeDisplayed,itemsCountPerPage }) => {
  useEffect(() => {
    fetchUomStart();
  }, [fetchUomStart]);
  const [state, setState] = useState({
    addedItems: {},
    modal: false, Name: '',Address:'',AddressLatLong:latitude+','+longitude, NativeName: '', Description: ''
  });
  let history = useHistory();

  const mappedData = offices.map(request => {
    return {
      Name: request.Name,
      NativeName:request.NativeName,
      Address:request.Address,
      AddressLatLong:request.AddressLatLong,
      Description:request.Description
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
    }
  ];
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL', payload: 'OFFICE' });
  }
  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: 'OFFICE' });
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  const handleSubmit = () => {
    const form = { ...state };
    delete form['modal'];
    delete form['addedItems'];

    dispatch({
      type: 'ADD_ORG_OFFICE_START', payload: {
        ...form, Organization: organization
      }
    })
  }

  const { Name, NativeName,Address,AddressLatLong, Description, ImageUrl, ImageInBase64 } = state;
  const handlePageChange = (page) =>{
    dispatch({
      type:'FETCH_ORG_OFFICES_START',payload:organization.Id,
      params:{activePage:page,totalItemsCount,pageRangeDisplayed,itemsCountPerPage}
      })
  }
  return (
    <>
      <TitleWithAction>
        <h2>{organization ? organization.Name : null} Offices</h2>
        <button onClick={openModal}>Add a office</button>
      </TitleWithAction>
      <div className='modal-holder'>
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
                <input placeholder='Latitude,Longitude' type='text' onChange={handleChange} name="AddressLatLong" value={AddressLatLong} />
                <textarea placeholder='Address' type='text' onChange={handleChange} name="Address" value={Address}></textarea>
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
  const { organization,user } = state;
  const {latitude,longitude} = user;
  return {
    latitude,longitude,
    offices: organization.offices,
    organizations: organization.organizations,
    organization: organization.current,
    items: organization.items,
    form:organization.form,
    activePage:organization && organization.activePage ?organization.activePage:0,
    totalItemsCount:organization && organization.totalItemsCount ?organization.totalItemsCount:0,
    itemsCountPerPage:organization && organization.itemsCountPerPage ?organization.itemsCountPerPage:0,
    pageRangeDisplayed:organization && organization.pageRangeDisplayed ?organization.pageRangeDisplayed:0
  }
}
const mapDispatch = dispatch => ({
  fetchUomStart: () => dispatch(fetchUomStart()),
})
export default connect(mapState, mapDispatch)(OrganizationOffices);