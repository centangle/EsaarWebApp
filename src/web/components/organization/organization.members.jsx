import React from 'react';
import { connect } from 'react-redux';
import Tabular from '../grid-to-list/tabular.component';
import { useHistory } from "react-router-dom";
import GridToList from '../grid-to-list/grid-to-list.component';
const OrganizationMembers = ({ members, organizations, dispatch,type }) => {
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
  return (
    <div>
      <h2>Organization {type}s</h2>
      <GridToList handleClick={handleClick} type='ORGANIZATION' data={mappedData} />
    </div>
  )
}
const mapState = (state) => {
  const { organization } = state;
  return {
    members: organization.members,
    organizations: organization.organizations
  }
}
export default connect(mapState)(OrganizationMembers);