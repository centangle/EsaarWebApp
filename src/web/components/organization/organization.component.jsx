import React, { useState } from 'react';
import { connect } from 'react-redux';
import OrganizationAdder from './organization.adder';
import GridToList from '../grid-to-list/grid-to-list.component';
import { useHistory } from "react-router-dom";
import Modal from '../modal/modal.component';
import {TitleWithAction} from './organization.styles';
import Search from '../search/search.component';
import Pagination from "react-js-pagination";
const Organzation = ({ data, dispatch,form,activePage,totalItemsCount,pageRangeDisplayed,itemsCountPerPage }) => {
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
  const handleSearch = (term,filters) =>{
    console.log(term,filters);
  }
  const handlePageChange = (page) =>{
    dispatch({
      type:'FETCH_ORGANIZATION_START',payload:'',
      params:{activePage:page,totalItemsCount,pageRangeDisplayed,itemsCountPerPage}
      })
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
      
      <Search filters={{location:['Lahore','Islamabad'],categories:['Education','Health']}} handleSearch={handleSearch} />
      <GridToList handleClick={handleClick} type='ORGANIZATION' data={state.treeData}  />
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
  const { organization } = state;
  return {
    data: Object.keys(organization.organizations).map(key => {
      return { ...organization.organizations[key], title: organization.organizations[key].Name }
    }),
    form:organization.form,
    activePage:organization.activePage ?organization.activePage:0,
    totalItemsCount:organization.totalItemsCount ?organization.totalItemsCount:0,
    itemsCountPerPage:organization.itemsCountPerPage ?organization.itemsCountPerPage:0,
    pageRangeDisplayed:organization.pageRangeDisplayed ?organization.pageRangeDisplayed:0
  }
}
export default connect(mapState)(Organzation);