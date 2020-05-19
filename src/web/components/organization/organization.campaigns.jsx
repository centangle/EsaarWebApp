import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
import { TitleWithAction, FormHolder } from './organization.styles';
import Modal from '../modal/modal.component';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';
import { Link } from 'react-router-dom';
import { fetchUomStart } from '../../../common/redux/uom/uom.actions';
import Pagination from "react-js-pagination";
import Select from 'react-select';

const OrganizationCampaigns = ({ events, campaigns, organizations, dispatch, organization, fetchUomStart, form, activePage, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }) => {
  useEffect(() => {
    fetchUomStart();
  }, [fetchUomStart]);
  const [state, setState] = useState({
    addedItems: {},
    modal: false, Name: '', Event: '', NativeName: '', StartDate: '', EndDate: '', Description: '', Worth: '', DefaultUOM: ''
  });
  let history = useHistory();

  const mappedData = campaigns.map(request => {
    return {
      Name: request.Name,
      NativeName: request.NativeName,
      Event: '',
      Description: request.Description,
      StartDate: request.StartDate,
      EndDate: request.EndDate,
      Details: <Link to={`/campaigns/${request.Id}`} className='tbl-btn'>Details</Link>
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
      name: 'Details',
      selector: 'Details',
      sortable: false
    }
  ];
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL', payload: 'CAMPAIGNS' });
  }
  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: 'CAMPAIGNS' });
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  const handleSubmit = () => {
    const form = { ...state };
    delete form['modal'];
    delete form['addedItems'];

    dispatch({
      type: 'ADD_ORG_CAMPAIGN_START', payload: {
        ...form, Organization: organization,
        Event: {
          Id: Event.value
        },
        Items: Object.keys(state.addedItems).map(key => {
          return {
            Item: { Id: key },
            ItemQuantity: state.addedItems[key].ItemQuantity,
            ItemUOM: state.addedItems[key].ItemUOM,
          }
        })
      }
    })
  }
  const handleUom = (item) => {
    setState({ ...state, DefaultUOM: item });
  }
  const { Name, NativeName,Event, StartDate, EndDate, Worth, Description, DefaultUOM, ImageUrl, ImageInBase64 } = state;
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
  const handlePageChange = (page) => {
    dispatch({
      type: 'FETCH_ORG_CAMPAIGNS_START', payload: organization.Id,
      params: { activePage: page, totalItemsCount, pageRangeDisplayed, itemsCountPerPage }
    })
  }
  const handleDrop = (item) => {
    console.log(Event);
    setState({ ...state, Event: item });
  }
  const mappedEvents = Object.keys(events).map(key => { return { value: events[key].Id, label: events[key].Name } });
  return (
    <>
      <TitleWithAction>
        <h2>{organization ? organization.Name : null} Campaigns</h2>
        <button onClick={openModal}>Add a campaign</button>
      </TitleWithAction>
      <div className='modal-holder'>
        {form.modal ? <Modal closeModal={closeModal}>
          <h2>Add Organization Campaign</h2>
          <FormHolder>
            <div className='two-panel'>
              <div className='uploader'>
                <UploadedComponent logo />
                <UploaderComponent title="Add Logo" type="file" item="1" />
              </div>
              <div className='input-holder'>
                <input placeholder='Name' type='text' onChange={handleChange} name="Name" value={Name} />
                <input placeholder='Native Name' type='text' onChange={handleChange} name="NativeName" value={NativeName} />
                <input placeholder='Total Worth' type='text' onChange={handleChange} name="Worth" value={Worth} />
                <Select value={Event} onChange={(item) => handleDrop(item)} options={mappedEvents} className='dropdown' placeholder="Event..." />
                <textarea placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description}></textarea>
                <input placeholder='Start Date' type='text' onChange={handleChange} name="StartDate" value={StartDate} />
                <input placeholder='End Date' type='text' onChange={handleChange} name="EndDate" value={EndDate} />
                <button onClick={handleSubmit}>Add Campaign</button>
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
  const { organization } = state;
  const { event } = state;
  return {
    campaigns: organization.campaigns,
    organizations: organization.organizations,
    organization: organization.current,
    items: organization.items,
    events: event.events,
    form: organization.form,
    activePage: organization && organization.activePage ? organization.activePage : 0,
    totalItemsCount: organization && organization.totalItemsCount ? organization.totalItemsCount : 0,
    itemsCountPerPage: organization && organization.itemsCountPerPage ? organization.itemsCountPerPage : 0,
    pageRangeDisplayed: organization && organization.pageRangeDisplayed ? organization.pageRangeDisplayed : 0
  }
}
const mapDispatch = dispatch => ({
  fetchUomStart: () => dispatch(fetchUomStart()),
})
export default connect(mapState, mapDispatch)(OrganizationCampaigns);