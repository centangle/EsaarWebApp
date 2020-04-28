import React, { useState } from 'react';
import { connect } from 'react-redux';
import OrganizationAdder from './organization.adder';
import GridToList from '../grid-to-list/grid-to-list.component';
import { useHistory } from "react-router-dom";
import Modal from '../modal/modal.component';
import {TitleWithAction} from './organization.styles';
const Organzation = ({ data, dispatch,form }) => {
  let history = useHistory();
  const [state, setState] = useState({ treeData: data });
  const closeModal = () => {
    dispatch({type:'CLOSE_MODAL',payload:'ORG'});
  }
  const handleAddOrg = () =>{
    dispatch({type:'OPEN_MODAL',payload:'ORG'});
  }
  const handleClick = (obj) => {
    dispatch({ type: 'ORGANIZATION_SELECTED', payload: obj });
    history.push(history.location.pathname + '/' + obj.Id);
  }
  
  return (
    <div className='page-right'>
      <TitleWithAction>
        {
          form.modal ? <Modal closeModal={closeModal}>
            <OrganizationAdder />
          </Modal> : null
        }
        <h2>Organizations / Clusters</h2>
        <button onClick={handleAddOrg}>Add Organization</button>
      </TitleWithAction>

      <GridToList handleClick={handleClick} type='ORGANIZATION' data={state.treeData} />
    </div>
  )
}
const mapState = (state) => {
  const { organization } = state;
  return {
    data: Object.keys(organization.organizations).map(key => {
      return { ...organization.organizations[key], title: organization.organizations[key].Name }
    }),
    form:organization.form
  }
}
export default connect(mapState)(Organzation);