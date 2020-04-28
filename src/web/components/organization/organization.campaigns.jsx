import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
import { TitleWithAction, FormHolder } from './organization.styles';
import Modal from '../modal/modal.component';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';
import UomInput from '../uom/uom.overview';

import { fetchUomStart } from '../../../common/redux/setting/setting.actions';
import ItemWithQtySelector from '../item/item.withqty.selector';

const OrganizationCampaigns = ({ campaigns, organizations, dispatch, organization, fetchUomStart,form }) => {
  useEffect(() => {
    fetchUomStart();
  }, [fetchUomStart]);
  const [state, setState] = useState({
    addedItems: {},
    modal: false, Name: '', NativeName: '', Description: '', Worth: '', DefaultUOM: ''
  });
  let history = useHistory();

  const mappedData = campaigns.map(request => {
    return {
      Name: request.Name,
      NativeName:request.NativeName,
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
      type: 'ADD_ORG_CAMPAIGN_START', payload: {
        ...form, Organization: organization,
        Items:Object.keys(state.addedItems).map(key=>{
          return {
            Item:{Id:key},
            ItemQuantity:state.addedItems[key].ItemQuantity,
            ItemUOM:state.addedItems[key].ItemUOM,
          }
        })
      }
    })
  }
  const handleUom = (item) => {
    setState({ ...state, DefaultUOM: item });
  }
  const { Name, NativeName, Worth, Description, DefaultUOM, ImageUrl, ImageInBase64 } = state;
  const handleAdd = (input) => {
    setState({
      ...state,
      addedItems: {
        ...state.addedItems,
        [input.Item.value]: { Item: input.Item, ItemQuantity: input.ItemQuantity, ItemUOM: input.ItemUOM }
      }
    });
  }
  const handleRemove = (item) => {
    //console.log(item,state.addedItems);
    const filteredKeys = state.addedItems;
    delete filteredKeys[item.value];
    setState({
      ...state,
      addedItems: { ...filteredKeys }
    });
  }
  return (
    <>
      <TitleWithAction>
        <h2>{organization ? organization.Name : null} Campaigns</h2>
        <button onClick={openModal}>Add a campaign</button>
      </TitleWithAction>
      <div className='btn'>
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
                <UomInput name="DefaultUOM" onSelect={handleUom} />
                <textarea placeholder='Description' type='text' onChange={handleChange} name="Description" value={Description}></textarea>
                <ItemWithQtySelector
                  handleAdd={handleAdd} handleRemove={handleRemove}
                  addedItems={state.addedItems}
                />
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
      </div>
    </>
  )
}
const mapState = (state) => {
  const { organization } = state;
  return {
    campaigns: organization.campaigns,
    organizations: organization.organizations,
    organization: organization.current,
    items: organization.items,
    form:organization.form
  }
}
const mapDispatch = dispatch => ({
  fetchUomStart: () => dispatch(fetchUomStart()),
})
export default connect(mapState, mapDispatch)(OrganizationCampaigns);