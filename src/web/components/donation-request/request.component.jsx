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
    //dispatch({ type: obj.Type.toUpperCase() + '_SELECTED', payload: obj });
    history.push(history.location.pathname + '/' + obj.DonationRequestOrganization.Id);
  }
  const mappedData = data.map(request => {
    return {
      Name: request.Member.Name,
      Description: request.Member.Name + ' has requested to ' + request.Type + '. The current status is ' + request.DonationRequestOrganization.Status,
      ImageUrl: request.Member.ImageUrl,
      children: [], Id: request.Id,
      actions: [
          { id: request.Id+'assign', item: request, title: 'Self Asign', handleClick: handleAssign, visible: request.CanSelfAssign === true },
          { id: request.Id+'view', item: request, title: 'View', handleClick: handleClick, visible: request.CanAccessRequestThread === true }
        ]
    }
  });
  const handleSearch = (term,filters) =>{
    dispatch({ type: 'FETCH_REQUEST_START',params:{...params,name:term,filters:[filters]} });
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
      <Search type='donation' filters={{location:['Lahore','Islamabad'],categories:['Education','Health']}} handleSearch={handleSearch} />
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
  const { donation, organization } = state;
  return {
    data: Object.keys(donation.donations).map(key => {
      return { ...donation.donations[key], title: donation.donations[key].Member.Name }
    }),
    organizations: organization.organizations,
    activePage:donation.activePage ?donation.activePage:0,
    totalItemsCount:donation.totalItemsCount ?donation.totalItemsCount:0,
    itemsCountPerPage:donation.itemsCountPerPage ?donation.itemsCountPerPage:0,
    pageRangeDisplayed:donation.pageRangeDisplayed ?donation.pageRangeDisplayed:0
  }
}
export default connect(mapState)(Request);