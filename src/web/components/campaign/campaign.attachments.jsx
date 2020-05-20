import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import GridToList from '../grid-to-list/grid-to-list.component';
import { TitleWithAction, FormHolder } from './campaign.styles';
import Modal from '../modal/modal.component';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';
import Pagination from "react-js-pagination";
const baseUrl = require('../../../common/utility/request').baseUrl;

const CampaignAttachments = ({ campaign, attachments, campaigns, dispatch, type, files, form,activePage,totalItemsCount,pageRangeDisplayed,itemsCountPerPage }) => {
  let history = useHistory();
  const [state, setState] = useState({ modal: false });
  const handleClick = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    history.push('/attachments/' + obj.Id);
  }
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL', payload: 'ATTACHMENT' });
  }
  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: 'ATTACHMENT' });
  }
  const mappedData = attachments ? attachments.map(item => {
    return {
      ImageUrl: item.Url,
      Id: item.Id
    }
  }) : {};
  const handleSubmit = () => {
    const f = files.map(f => {
      return {
        "Entity": {
          "Id": campaign.Id
        },
        "EntityType": "Campaign",
        "Url": f.file,
        //"OriginalFileName": "string",
        //"Note": "string",
      }
    });
    dispatch({
      type: 'ADD_CAMPAIGN_ATTACHMENT_START',
      payload: {
        campaignId: campaign.Id,
        attachments: f
      }
    })
  }
  const handleChange = (e, f) => {
    setState({ ...state, [e.target.name]: e.target.value, file: f });
  }
    const handlePageChange = (page) =>{
    dispatch({
      type:'FETCH_CAMPAIGN_ATTACHMENTS_START',payload:campaign.Id,
      params:{activePage:page,totalItemsCount,pageRangeDisplayed,itemsCountPerPage}
      })
  }
  return (
    <div>
      <TitleWithAction>
        <h2>Attachments</h2>
        <button onClick={openModal}>Add New</button>
      </TitleWithAction>
      {
        form.attachmentModal ? <Modal closeModal={closeModal} >
          <UploaderComponent title="Select Files" />
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
          <div className='inline-tr'>
            <button className='save-btn' onClick={handleSubmit}>Save Attachments</button>
          </div>

        </Modal> : null
      }
      <GridToList handleClick={handleClick} type='CAMPAIGN' data={mappedData} />
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
  const { campaign } = state;
  const { upload } = state;
  return {
    attachments: campaign.attachments,
    campaigns: campaign.campaigns,
    files: upload.files,
    form: campaign.form,
    activePage:campaign && campaign.activePage ?campaign.activePage:0,
    totalItemsCount:campaign && campaign.totalItemsCount ?campaign.totalItemsCount:0,
    itemsCountPerPage:campaign && campaign.itemsCountPerPage ?campaign.itemsCountPerPage:0,
    pageRangeDisplayed:campaign && campaign.pageRangeDisplayed ?campaign.pageRangeDisplayed:0
  }
}
export default connect(mapState)(CampaignAttachments);