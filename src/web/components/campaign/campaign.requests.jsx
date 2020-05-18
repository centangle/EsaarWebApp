import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
import Pagination from "react-js-pagination";
const CampaignRequests = ({ requests, campaigns, dispatch, campaign,activePage,totalItemsCount,pageRangeDisplayed,itemsCountPerPage }) => {
  let history = useHistory();
  const handleAssign = (item) => {
    dispatch({ type: 'ASSIGN_REQUEST_START', payload: { campaignId: item.Campaign.Id, requestId: item.Id } });
  }
  const handleClick = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    history.push('/requests/' + obj.Id);
  }
  const mappedData = requests.map(request => {
    return {
      Name: request.Campaign.Name,
      RequestType:request.Type,
      Date:request.CreatedDate,
      AssignedTo:request.Moderator.Name,
      ReqBy:request.Entity.Name,
      Status:request.Status,
      Description: request.Entity.Name + ' has requested to ' + request.Type + '. The current status is ' + request.Status,
      ImageUrl: campaigns[request.Campaign.Id] ? campaigns[request.Campaign.Id].ImageUrl : null,
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
  const handlePageChange = (page) =>{
    dispatch({
      type:'FETCH_CAMPAIGN_REQUESTS_START',payload:campaign.Id,
      params:{activePage:page,totalItemsCount,pageRangeDisplayed,itemsCountPerPage}
      })
  }
  return (
    <>
      <h2>Campaign Requests</h2>
      <div className='table'>
        <DataTable
          noHeader
          columns={columns}
          data={mappedData}
        />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange.bind(this)}
        />
      </div>
    </>
  )
}
const mapState = (state) => {
  const { campaign } = state;
  return {
    requests: campaign.requests && campaign.requests.items ?campaign.requests.items:[],
    campaigns: campaign.campaigns,
    campaign: campaign.current,
    activePage:campaign.requests && campaign.requests.activePage ?campaign.requests.activePage:0,
    totalItemsCount:campaign.requests && campaign.requests.totalItemsCount ?campaign.requests.totalItemsCount:0,
    itemsCountPerPage:campaign.requests && campaign.requests.itemsCountPerPage ?campaign.requests.itemsCountPerPage:0,
    pageRangeDisplayed:campaign.requests && campaign.requests.pageRangeDisplayed ?campaign.requests.pageRangeDisplayed:0
  }
}
export default connect(mapState)(CampaignRequests);