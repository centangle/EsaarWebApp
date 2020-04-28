import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
const OrganizationRequests = ({ requests, organizations, dispatch, organization }) => {
  let history = useHistory();
  const handleAssign = (item) => {
    dispatch({ type: 'ASSIGN_REQUEST_START', payload: { organizationId: item.Organization.Id, requestId: item.Id } });
  }
  const handleClick = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    history.push('/requests/' + obj.Id);
  }
  const mappedData = requests.map(request => {
    return {
      Name: request.Organization.Name,
      RequestType:request.Type,
      Date:request.CreatedDate,
      AssignedTo:request.Moderator.Name,
      ReqBy:request.Entity.Name,
      Status:request.Status,
      Description: request.Entity.Name + ' has requested to ' + request.Type + '. The current status is ' + request.Status,
      ImageUrl: organizations[request.Organization.Id] ? organizations[request.Organization.Id].ImageUrl : null,
      children: [], Id: request.Id,
      actions: [
        { id: request.Id + 'assign', item: request, title: 'Self Asign', handleClick: handleAssign, visible: request.CanSelfAssign === true },
        { id: request.Id + 'view', item: request, title: 'View', handleClick: handleClick, visible: request.CanAccessRequestThread === true }
      ]
    }
  });

  const columns = [
    {
      name: 'Request Type',
      selector: 'RequestType',
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'Date',
      sortable: true,
    },
    {
      name: 'Assigned To',
      selector: 'AssignedTo',
      sortable: true,
    },
    {
      name:'Req.By',
      selector:'ReqBy',
      sortable:true
    },
    {
      name:'Status',
      selector:'Status',
      sortable:true
    }
  ];
  return (
    <>
      <h2>Organization Requests</h2>
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
    requests: organization.requests,
    organizations: organization.organizations,
    organization: organization.current
  }
}
export default connect(mapState)(OrganizationRequests);