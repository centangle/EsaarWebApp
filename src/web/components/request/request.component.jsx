import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tabular from '../grid-to-list/tabular.component';
import { useHistory } from "react-router-dom";
import { params } from '../../../common/utility/request';
import Search from '../search/search.component';
import Pagination from "react-js-pagination";
const Request = ({ data, dispatch, organizations,activePage,totalItemsCount,pageRangeDisplayed,itemsCountPerPage }) => {
  let history = useHistory();
  const handleAssign = (item) => {
    dispatch({ type: 'ASSIGN_REQUEST_START', payload: { organizationId: item.Organization.Id, requestId: item.Id } });
  }
  const handleClick = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    history.push(history.location.pathname + '/' + obj.Id);
  }
  const mappedData = data.map(request => {
    return {
      Name: request.Organization.Name,
      Description: request.Entity.Name + ' has requested to ' + request.Type + '. The current status is ' + request.Status,
      ImageUrl: request.Organization.ImageUrl,
      children: [], Id: request.Id,
      actions: [
          { id: request.Id+'assign', item: request, title: 'Self Asign', handleClick: handleAssign, visible: request.CanSelfAssign === true },
          { id: request.Id+'view', item: request, title: 'View', handleClick: handleClick, visible: request.CanAccessRequestThread === true }
        ]
    }
  })
  const handleSearch = (term,filters) =>{
    dispatch({ type: 'FETCH_REQUEST_START',params:{...params,name:term} });
  }
  const handlePageChange = (page) =>{
    dispatch({
      type:'FETCH_REQUEST_START',payload:'',
      params:{activePage:page,totalItemsCount,pageRangeDisplayed,itemsCountPerPage}
      })
  }
  return (
    <div className='page-right'>
      {/* <RequestAdder /> */}
      <Search type='request' filters={{location:['Lahore','Islamabad'],categories:['Education','Health']}} handleSearch={handleSearch} />
      <Tabular type='REQUEST' data={mappedData} />
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
  const { request, organization } = state;
  return {
    data: Object.keys(request.requests).map(key => {
      return { ...request.requests[key], title: request.requests[key].Organization.Name }
    }),
    organizations: organization.organizations,
    activePage:request.activePage ?request.activePage:0,
    totalItemsCount:request.totalItemsCount ?request.totalItemsCount:0,
    itemsCountPerPage:request.itemsCountPerPage ?request.itemsCountPerPage:0,
    pageRangeDisplayed:request.pageRangeDisplayed ?request.pageRangeDisplayed:0
  }
}
export default connect(mapState)(Request);