import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import GridToList from '../grid-to-list/grid-to-list.component';
import { TitleWithAction, FormHolder } from './organization.styles';
import Modal from '../modal/modal.component';
import UploaderComponent from '../uploader/uploader.component';
import UploadedComponent from '../uploader/uploaded.component';
const baseUrl = require('../../../common/utility/request').baseUrl;
const OrganizationAttachments = ({ organization, attachments, organizations, dispatch, type, files, form }) => {
  let history = useHistory();
  const [state, setState] = useState({ modal: false });
  const handleClick = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    history.push('/attachments/' + obj.Id);
  }
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL', payload: 'ORG' });
  }
  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: 'ORG' });
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
          "Id": organization.Id
        },
        "EntityType": "Organization",
        "Url": f.file,
        //"OriginalFileName": "string",
        //"Note": "string",
      }
    });
    dispatch({
      type: 'ADD_ORG_ATTACHMENT_START',
      payload: {
        organizationId: organization.Id,
        attachments: f
      }
    })
  }
  const handleChange = (e, f) => {
    setState({ ...state, [e.target.name]: e.target.value, file: f });
  }
  return (
    <div>
      <TitleWithAction>
        <h2>Attachments</h2>
        <button onClick={openModal}>Add New</button>
      </TitleWithAction>
      {
        form.modal ? <Modal closeModal={closeModal} >
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
      <GridToList handleClick={handleClick} type='ORGANIZATION' data={mappedData} />
    </div>
  )
}
const mapState = (state) => {
  const { organization } = state;
  const { upload } = state;
  return {
    attachments: organization.attachments,
    organizations: organization.organizations,
    files: upload.files,
    form: organization.form
  }
}
export default connect(mapState)(OrganizationAttachments);