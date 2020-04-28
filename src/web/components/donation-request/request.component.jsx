import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tabular from '../grid-to-list/tabular.component';
import { useHistory } from "react-router-dom";
const Request = ({ data, dispatch, organizations }) => {
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
  })
  return (
    <div className='page-right'>
      {/* <RequestAdder /> */}
      <Tabular type='REQUEST' data={mappedData} />
    </div>
  )
}
const mapState = (state) => {
  const { donation, organization } = state;
  return {
    data: Object.keys(donation.donations).map(key => {
      return { ...donation.donations[key], title: donation.donations[key].Member.Name }
    }),
    organizations: organization.organizations
  }
}
export default connect(mapState)(Request);