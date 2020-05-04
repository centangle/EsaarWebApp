import React from 'react';
import { connect } from 'react-redux';
import Tabular from '../grid-to-list/tabular.component';
import { useHistory } from "react-router-dom";
import GridToList from '../grid-to-list/grid-to-list.component';
import Pagination from "react-js-pagination";
const OrganizationMembers = ({ members,organization, organizations, dispatch,type,activePage,totalItemsCount,pageRangeDisplayed,itemsCountPerPage }) => {
  let history = useHistory();
  const handleAssign = (item) => {
    dispatch({ type: 'ASSIGN_MEMBER_START', payload: { organizationId: item.Organization.Id, memberId: item.Id } });
  }
  const handleClick = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    history.push('/members/' + obj.Id);
  }
  const mappedData = members?members.map(member => {
    return {
      Name: member.Member.Name,
      Description: member.Member.Name,
      ImageUrl: organizations[member.Organization.Id] ? organizations[member.Organization.Id].ImageUrl : null,
      children: [], Id: member.Id,
      actions: [

      ]
    }
  }):{};
    const handlePageChange = (page) =>{
    dispatch({
      type:'FETCH_ORG_MEMBERS_START',payload:organization.Id,userType:type,
      params:{activePage:page,totalItemsCount,pageRangeDisplayed,itemsCountPerPage}
      })
  }
  return (
    <div>
      <h2>Organization {type}s</h2>
      <GridToList handleClick={handleClick} type='ORGANIZATION' data={mappedData} />
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
    members: organization.members,
    organizations: organization.organizations,
    activePage:organization && organization.activePage ?organization.activePage:0,
    totalItemsCount:organization && organization.totalItemsCount ?organization.totalItemsCount:0,
    itemsCountPerPage:organization && organization.itemsCountPerPage ?organization.itemsCountPerPage:0,
    pageRangeDisplayed:organization && organization.pageRangeDisplayed ?organization.pageRangeDisplayed:0
  }
}
export default connect(mapState)(OrganizationMembers);